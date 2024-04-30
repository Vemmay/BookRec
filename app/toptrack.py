from flask import Flask, request, redirect, session, url_for, render_template
import spotipy
from spotipy.oauth2 import SpotifyOAuth
import time 
import requests 
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY')
app.config['SESSION_COOKIE_NAME'] = 'spotify_auth'
TOKEN_INFO = "token_info"

@app.route('/')
def login():
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
        redirect('/')
    sp = spotipy.Spotify(auth=token_info['access_token'])
    top_tracks = sp.current_user_top_tracks(limit=1, offset = 0, time_range="long_term")
    if len(top_tracks['items']) > 0:
        track = top_tracks['items'][0]
        release_year = track['album']['release_date'][:4] if 'release_date' in track['album'] else "Unknown"
        art = track['artists'][0]['name']
        api_keym = '72160f7c60e3b435deee2c955322bb0b'
        track_url = track['external_urls']['spotify']
        urlm = f'https://api.themoviedb.org/3/discover/movie?api_key={api_keym}&primary_release_year={release_year}&sort_by=popularity.desc'

        response = requests.get(urlm)
        data = response.json()
        movies = [0]*10

        for i in range(10):
            movies[i] = data['results'][i]['title']


        return render_template("movies.html", year=release_year, movie=movies, artist=art, song=track, songurl = track_url)
    else:
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
    return SpotifyOAuth(client_id=os.getenv('CLIENT_ID'), client_secret=os.getenv('CLIENT_SECRET'), redirect_uri=url_for('redirectPage', _external=True), scope="user-library-read user-top-read")

if __name__ == '__main__':
    app.run(debug=True)
