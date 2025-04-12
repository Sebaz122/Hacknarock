import json
from random import choice
from dotenv import load_dotenv
import os
import base64
from requests import post,get

def _get_random_genre():
    with open('./static/genres.json', 'r') as file:
        data = json.load(file)
        return choice(data)

def _get_track(genre):
    ...

def _get_genres(song):
    ...

def prepare_songs_and_genres():
    return _get_random_genre()

def _get_new_token():
    auth_string = client_id+":"+client_secret
    auth_bytes=auth_string.encode("utf-8")
    auth_base64=str(base64.b64encode(auth_bytes), "utf-8")

    url="https://accounts.spotify.com/api/token"
    headers= {
        "Authorization": "Basic " + auth_base64,
        "Content-Type": "application/x-www-form-urlencoded"
    }
    data={"grant_type": "client_credentials"}
    result=post(url,headers=headers, data=data)
    json_result=json.loads(result.content)
    token=json_result["access_token"]
    return token

def _get_auth_header(token):
    return {"Authorization": "Bearer " + token}

def _get_genre_songs_urls(token, genre):
    url = "https://api.spotify.com/v1/search"
    headers= _get_auth_header(token)
    query= f"q={genre}&type=track&limit=20"
    query_url = url+"?"+query
    result=get(query_url, headers=headers)
    json_result=json.loads(result.content)
    track_urls=[]
    track_names=[]
    max=0
    for track in json_result['tracks']['items']:
        track_url=track['external_urls']['spotify']
        if(track_url):
            track_urls.append(track_url)
            track_name=track['name']
            track_names.append(track_name)
            max+=1
            if max==9:
                break
        else:
            continue
    print(track_urls)
    print(track_names)


if __name__=="__main__":
    load_dotenv()
    client_id = os.getenv("CLIENT_ID")
    client_secret= os.getenv("CLIENT_SECRET")
    token=_get_new_token()
    _get_genre_songs_urls(token, "rock")