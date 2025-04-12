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


def prepare_songs_and_genres():
    return _get_random_genre()

def _get_songs_by_years(years,amount):
    '''years in format i.e. 2020-2025, amount of songs received '''
    token=_get_new_token()
    url = "https://api.spotify.com/v1/search"
    headers= _get_auth_header(token)
    query= "q=year%3A"+ years +"&type=track&limit=50&offset=0"
    query_url = url+"?"+query
    result=get(query_url, headers=headers)
    json_result=json.loads(result.content)
    track_urls=[]
    track_names=[]
    songs_amount = [json_result['tracks']['items'][i] for i in range(amount)]
    for track in songs_amount:
        track_url=track['external_urls']['spotify']
        track_urls.append(track_url)
        track_name=track['name']
        track_names.append(track_name)
    # print(track_urls)
    # print(track_names)
    return track_names



def _get_genres_by_artist(artist):
    '''returns all genres for one artist'''
    token=_get_new_token()
    url = "https://api.spotify.com/v1/search"
    headers= _get_auth_header(token)
    query= f"q={artist}&type=artist&limit=1"
    query_url = url+"?"+query
    result=get(query_url, headers=headers)
    json_result=json.loads(result.content)
    genres=[]
    for i in json_result['artists']['items'][0]['genres']:
        genre=i
        genres.append(i)
    print(genres)
    return genres


def _get_artist_by_track(track):
    '''returns one artist from one track'''
    token=_get_new_token()
    url = "https://api.spotify.com/v1/search"
    headers= _get_auth_header(token)
    query= f"q={track}&type=track&limit=1"
    query_url = url+"?"+query
    result=get(query_url, headers=headers)
    json_result=json.loads(result.content)
    artist=json_result['tracks']['items'][0]['album']['artists'][0]['name']
    print(artist)
    return artist
    

def _get_track_by_genres(genres):
    '''returns one track from genres array if exist, else None'''
    token=_get_new_token()
    url = "https://api.spotify.com/v1/search"
    headers= _get_auth_header(token)
    query= f"q=genres%3A%5B"
    for i in genres:
        query+="%22" + i + "%22" + "%2C"
    query+="%5D"
    query+="&type=track&limit=1"
    query_url = url+"?"+query
    result=get(query_url, headers=headers)
    json_result=json.loads(result.content)
    # print(json_result)
    track=json_result['tracks']['items'][0]['name']
    print(track)
    if(track):
        return track
    else:
        return None

def _get_genre_songs_urls(genre):
    '''returns 9 tracks from one genre'''
    token=_get_new_token()
    url = "https://api.spotify.com/v1/search"
    headers= _get_auth_header(token)
    query= f"q=genres%3A%5B%22{genre}%22%5D&type=track&limit=20"
    query_url = url+"?"+query
    result=get(query_url, headers=headers)
    json_result=json.loads(result.content)
    track_urls=[]
    track_names=[]
    for track in json_result['tracks']['items']:
        track_url=track['external_urls']['spotify']
        track_urls.append(track_url)
        track_name=track['name']
        track_names.append(track_name)
    # print(track_names)
    return track_names


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


if __name__=="__main__":
    load_dotenv()
    client_id = os.getenv("CLIENT_ID")
    client_secret= os.getenv("CLIENT_SECRET")
    token=_get_new_token()
    ###testing functions###
    _get_genre_songs_urls("Celtic") 
    _get_songs_by_years("2020-2023",5)