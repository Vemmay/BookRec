from flask import Flask, request, redirect, session, url_for, render_template
import spotipy
from spotipy.oauth2 import SpotifyOAuth
import time 
import requests 
import os
from dotenv import load_dotenv
import sqlite3


load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY')
app.config['SESSION_COOKIE_NAME'] = 'spotify_auth'
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

@app.route('/')
def login():
    session.clear()
    sp_oauth = create_spotify_oauth()
    auth_url = sp_oauth.get_authorize_url()
    return redirect(auth_url)

@app.route('/redirect')
def redirectPage():
    sp_oauth = create_spotify_oauth()
    session.clear()
    code = request.args.get('code')
    token_info = sp_oauth.get_access_token(code)
    session[TOKEN_INFO] = token_info
    return redirect(url_for('getTrack', _external=True))

@app.route('/getTrack')
def getTrack():
    try:
        token_info = get_token()
    except:
        print("user not logged in")
        return redirect('/')
    sp = spotipy.Spotify(auth=token_info['access_token'])
    top_tracks = sp.current_user_top_tracks(limit=1, offset = 0, time_range="long_term")
    user_info = sp.current_user()
    user_email = user_info['email']

    conn = create_connection()
    cursor = conn.cursor()

    # Check if the user is already in the database
    cursor.execute("SELECT * FROM user_info WHERE email = ?", (user_email,))
    existing_user = cursor.fetchone()

    if existing_user is None:
        if len(top_tracks['items']) > 0:
            track = top_tracks['items']
            release_year = track['album']['release_date'][:4]
            art = track['artists'][0]['name']
            api_keym = '72160f7c60e3b435deee2c955322bb0b'
            song_name = track['name']
            song_url = track['external_urls']['spotify']
            urlm = f'https://api.themoviedb.org/3/discover/movie?api_key={api_keym}&primary_release_year={release_year}&sort_by=popularity.desc'

            response = requests.get(urlm)
            data = response.json()
            movies = [0]*10

            for i in range(10):
                movies[i] = data['results'][i]['title']

            # Insert user info into the database
            cursor.execute("INSERT INTO user_info (email, song_title, release_year) VALUES (?, ?, ?)", (user_email, song_name, release_year))
            conn.commit()

            conn.close()

            return render_template("movies.html", year=release_year, movie=movies, artist=art, song=song_name, songurl=song_url)

        else:
            conn.close()
            return render_template("notracks.html")
    else:
        # User exists in the database, fetch their song title and release year
        oldsong = existing_user[1]
        oldyear = existing_user[2]

        if len(top_tracks['items']) > 0:
            track = top_tracks['items'][0]['track']
            release_year = track['album']['release_date'][:4]
            art = track['artists'][0]['name']
            api_keym = '72160f7c60e3b435deee2c955322bb0b'
            song_name = track['name']
            song_url = track['external_urls']['spotify']
            urlm = f'https://api.themoviedb.org/3/discover/movie?api_key={api_keym}&primary_release_year={release_year}&sort_by=popularity.desc'

            response = requests.get(urlm)
            data = response.json()
            movies = [0]*10

            for i in range(10):
                movies[i] = data['results'][i]['title']

            cursor.execute("UPDATE user_info SET song_title = ?, release_year = ? WHERE email = ?", (song_name, release_year, user_email))
            conn.commit()

            conn.close()

            return render_template("existingmovies.html", year=release_year, movie=movies, artist=art, song=song_name, songurl=song_url, oldtrack = oldsong, oldyr = oldyear)

        else:
            conn.close()
            return render_template("notracks.html")

@app.route('/logout')
def logout():
    session.clear()
    return redirect('https://www.spotify.com/logout/')

def get_token():
    token_info = session.get(TOKEN_INFO, None)
    if not token_info:
        raise "exception"
    now = int(time.time())
    is_expired = token_info['expires_at'] - now < 60
    if (is_expired):
        sp_oauth = create_spotify_oauth()
        token_info = sp_oauth.refresh_access_token[token_info['refresh_token']]

    return token_info

def create_spotify_oauth():
    return SpotifyOAuth(client_id=os.getenv('CLIENT_ID'), client_secret=os.getenv('CLIENT_SECRET'), redirect_uri=url_for('redirectPage', _external=True), scope="user-library-read user-top-read user-read-email")

if __name__ == '__main__':
    app.run(debug=True)
