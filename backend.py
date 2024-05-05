from flask import Flask, request, redirect, session, url_for, render_template, jsonify, send_from_directory
import requests
import json
import spotipy
from flask_cors import CORS, cross_origin
from spotipy import Spotify
from spotipy.oauth2 import SpotifyOAuth
from spotipy.cache_handler import FlaskSessionCacheHandler
import os
from dotenv import load_dotenv, find_dotenv
import sqlite3
import time

load_dotenv(find_dotenv())


app = Flask(__name__, static_folder='static')

#allow requests from client port
client_address='http://localhost:1234'
CORS(app, origins=['http://localhost:1234'])

app.config['SECRET_KEY'] = os.urandom(64)

#spotify required info for apps
client_id = os.environ.get("CLIENT_ID")
client_secret = os.environ.get("CLIENT_SECRET")
redirect_url = 'http://127.0.0.1:5000/callback' #endpoint to refresh token
scope = "user-library-read user-top-read user-read-email"
TOKEN_INFO = "token_info"
DATABASE = 'database.db'

def create_connection():
    conn = sqlite3.connect(DATABASE)
    return conn

def create_table():
    conn = create_connection()
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS user_info
                    (email TEXT, song_title TEXT, release_year INTEGER)''')
    conn.commit()
    conn.close()

create_table()


@app.route('/login')
@cross_origin(origins=['http://localhost:1234'])
def login():
    session.clear()
    sp_oauth = create_spotify_oauth()
    auth_url = sp_oauth.get_authorize_url()
    return redirect(auth_url)

@app.route('/callback')
def callback():
    sp_oauth = create_spotify_oauth()
    session.clear()
    code = request.args.get('code')
    token_info = sp_oauth.get_access_token(code)
    session[TOKEN_INFO] = token_info
    save_data()
    return redirect(client_address + '/Dashboard')

@app.route('/test')
def save_data():
    try:
        token_info = get_token()
    except:
        return redirect('/')
    
    # Fetch user information from Spotify
    sp = spotipy.Spotify(auth=token_info['access_token'])
    user_info = sp.current_user()
    user_email = user_info['email']  

    if not user_email:
        raise ValueError("Could not retrieve user email")

    # Find user's top song
    track = get_top_track(sp)

    # Save user information to the database
    year = save_user_info(user_email, track)

    # Save song info
    topSong(track)

    # Find movies based on the user's top song release date
    movie_listing(year)




   
def get_token():
    token_info = session.get(TOKEN_INFO)
    if not token_info:
        raise ValueError("No token information found in session.")

    now = int(time.time())
    is_expired = token_info['expires_at'] - now < 60

    if is_expired:
        sp_oauth = create_spotify_oauth()
        token_info = sp_oauth.refresh_access_token(token_info['refresh_token'])
        session[TOKEN_INFO] = token_info

    return token_info


def create_spotify_oauth():
    sp_oauth = SpotifyOAuth(client_id=client_id, client_secret=client_secret, redirect_uri=redirect_url, scope=scope) 
    return sp_oauth

@app.route('/logout')
def logout():
    session.pop("token_info", None)
    return redirect(client_address)

@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory(app.static_folder, filename)

@app.route('/movies')
def movie_listing(year=2003): #list of top movies based on top song; set to 2003 for testing
    num_movies = 8
    base_url = 'https://api.themoviedb.org/3/discover/movie'
    params = {
    'api_key': os.environ.get("API_KEY"),
    'sort_by': 'popularity.desc',
    'primary_release_year': year,
    'page': 1,
    }

    # Make the request to the tMDB API.
    response = requests.get(base_url, params=params)
    if response.status_code == 200:
        # Parse the response data.
        data = response.json()
        
        # Get the results list.
        results = data['results']
        
        # Prepare a list to hold the movie data.
        movies_list = []
        
        # Collect information about the top 9 movies.
        for i in range(min(num_movies, len(results))):
            movie = results[i]
            movie_info = {
                'title': movie['title'],
                'summary': movie['overview'],
                'poster_url': f"https://image.tmdb.org/t/p/w500{movie['poster_path']}",
                'id': movie['id'],
            }
            movies_list.append(movie_info)
        
        # Save the data to a JSON file.
        with open('static/top_movies.json', 'w') as json_file:
            json.dump(movies_list, json_file, indent=4)

        # Return JSON data as a response
        return jsonify(movies_list)
    
    else:
        return jsonify({"error": "Failed to fetch data from TMDb API"}), response.status_code


def get_top_track(sp):
    try:
        top_tracks = sp.current_user_top_tracks(limit=1, offset=0, time_range="long_term")
        if top_tracks['items']:
            return top_tracks['items'][0]
    except Exception as e:
        print(f"Error fetching top track: {e}")
        return None

def save_user_info(email, track):
    if track:
        song_title = track['name']
        release_year = track['album']['release_date'][:4] if 'release_date' in track['album'] else None
        
        try:
            conn = create_connection()
            cursor = conn.cursor()
            cursor.execute("INSERT INTO user_info (email, song_title, release_year) VALUES (?, ?, ?)", (email, song_title, release_year))
            conn.commit()
            return release_year
        except sqlite3.Error as e:
            print(f"Database error: {e}")
        finally:
            conn.close()

    return None

@app.route('/topSong')
def topSong(track):
    if track:
        song_info = {
            'song_title' : track['album']['name'],
            'cover': track['album']['images'][0]['url'],
            'artist' : track['artists'][0]['name'],
            'release_year' : track['album']['release_date'][:4] if 'release_date' in track['album'] else "Unknown",
            'artist_link' : track['artists'][0]['external_urls']['spotify'],
        }    

        # Save the data to a JSON file.
        with open('static/song.json', 'w') as json_file:
            json.dump(song_info, json_file, indent=4)

        # Return JSON data as a response
        return jsonify(song_info)

@app.route('/movie/<int:id>')
@cross_origin(origins=['http://localhost:1234'])
def get_movie_by_id(id):
    # Read the JSON file from the static folder
    try:
        with open('static/top_movies.json', 'r') as file:
            data = json.load(file)  # Parse the JSON file into a list of dictionaries
    except FileNotFoundError:
        # Return an error if the file is not found
        return jsonify({'error': 'JSON file not found'}), 404

    # Find the movie with the specified ID
    movie = next((movie for movie in data if movie['id'] == id), None)

    # Return the movie if found, or an error if not
    if movie:
        return jsonify(movie)
    else:
        return jsonify({'error': 'Movie with id {id} not found', 'id' : id}), 404

if __name__ == '__main__':
    app.run(debug=True)