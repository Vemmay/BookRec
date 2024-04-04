from flask import Flask, request, redirect, session, url_for
import spotipy
from spotipy.oauth2 import SpotifyOAuth

app = Flask(__name__)

app.config["SESSION_COOKIE_NAME"] = 'Spotify Cookie'
app.secret_key = 'skkwjeudeeeued387ue'
TOKEN_INFO = 'token_info'

@app.route('/')
def login():
    auth_url = create_spotify_oauth().get_authorize_url()
    return redirect(auth_url)

@app.route('/redirect')
def redirect_page():
    session.clear()
    code = request.args.get('code')
    token_info = create_spotify_oauth().get_access_token(code)
    session[TOKEN_INFO] = token_info 
    return redirect(url_for('topTrack', external=True))

@app.route('/topTrack')
def topTrack():
    try:
        token_info = get_token()
    except:
        print("User not logged in")
        return redirect('/')
    
    return "OAUTH"



def get_token():
    token_info = session.get(TOKEN_INFO, None)
    if not token_info:
        redirect(url_for('login', external=False))
    
    now = int(time.time())
    is_expired = token_info['expires_at'] - now < 60
    if is_expired:
        spotify_oauth = create_spotify_oauth()
        token_info = spotify_oauth.refresh_access_token(token_info['refesh_token'])
    return token_info

def create_spotify_oauth():
    return SpotifyOAuth(client_id = "9ba29340435e4a7bb36cea0f5a7d2ad5", client_secret = "387523222c19470bb19a8334ab0afd85", redirect_uri=url_for('redirect_page', _external=True), scope='user-library-read')


if __name__ == '__main__':
    app.run(debug=True)

