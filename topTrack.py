from flask import Flask, request, redirect, session, url_for
import spotipy
from spotipy.oauth2 import SpotifyOAuth
import time 

app = Flask(__name__)
app.secret_key = 'maksjdsnsjkjks'
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
        track_name = track['name']
        artists = ', '.join([artist['name'] for artist in track['artists']])
        album_name = track['album']['name']
        release_year = track['album']['release_date'][:4] if 'release_date' in track['album'] else "Unknown"
        return f"Your top track is '{track_name}' by {artists} from the album '{album_name}' released in {release_year}."
    else:
        return "No top tracks found."

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
    return SpotifyOAuth(client_id="9ba29340435e4a7bb36cea0f5a7d2ad5", client_secret="387523222c19470bb19a8334ab0afd85", redirect_uri=url_for('redirectPage', _external=True), scope="user-library-read user-top-read")

if __name__ == '__main__':
    app.run(debug=True)
