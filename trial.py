from flask import Flask, request, redirect, session, url_for, jsonify
import spotipy
from flask_cors import CORS
from spotipy import Spotify
from spotipy.oauth2 import SpotifyOAuth
from spotipy.cache_handler import FlaskSessionCacheHandler
import os
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())


app = Flask(__name__)

#allow requests from client port
client_address='http://localhost:1234'
CORS(app, origins=['*'], supports_credentials=True)

app.config['SECRET_KEY'] = os.urandom(64)

#spotify required info for apps
client_id = os.environ.get("CLIENT_ID")
client_secret = os.environ.get("CLIENT_SECRET")
redirect_url = 'http://127.0.0.1:5000/callback' #endpoint to refresh token
scope = "user-library-read user-top-read"


#auth manager
cache_handler = FlaskSessionCacheHandler(session)
sp_oauth = SpotifyOAuth(
    client_id=client_id, 
    client_secret=client_secret,
    redirect_uri=redirect_url,
    scope=scope,
    cache_handler=cache_handler 
)

#instance of spotify client
sp = Spotify(auth_manager=sp_oauth)



@app.route('/login')
def login():
    if not sp_oauth.validate_token(cache_handler.get_cached_token()): #empty if user not loggedin
        auth_url = sp_oauth.get_authorize_url()
        return redirect(auth_url)
    return redirect(client_address+'/Dashboard')

@app.route('/logout')
def logout():
    session.clear()
    return 'True'


#refreshes token after exp.
@app.route('/callback')
def callback():
    if not sp_oauth.validate_token(cache_handler.get_cached_token()): #empty if user not loggedin
        auth_url = sp_oauth.get_authorize_url()
        return redirect(auth_url)

@app.route('/getTopMovies')
def getTopMovies():
    if not sp_oauth.validate_token(cache_handler.get_cached_token()): #empty if user not loggedin
        auth_url = sp_oauth.get_authorize_url()
        return redirect(auth_url)
    
    #find top song from user
    top_tracks = sp.current_user_top_tracks(limit=1, offset = 0, time_range="long_term")
    if len(top_tracks['items']) > 0:
        track = top_tracks['items'][0]
        release_year = track['album']['release_date'][:4] if 'release_date' in track['album'] else "Unknown"
        api_keym = '72160f7c60e3b435deee2c955322bb0b'

        urlm = f'https://api.themoviedb.org/3/discover/movie?api_key={api_keym}&primary_release_year={release_year}&sort_by=popularity.desc'

        response = request.get(urlm)
        data = response.json()
        movies = [0]*10

        for i in range(10):
            movies[i] = data['results'][i]['title']

        return '\n'.join(movies)
    else:
        return "No top tracks found."


if __name__ == '__main__':
    app.run(debug=True)
