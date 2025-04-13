import json
import random
from random import choice
from dotenv import load_dotenv
import os
import base64
from requests import post,get

class ExternalApis:

    def __init__(self):
        load_dotenv()
        self.client_id = "c15748965b4647dfb42579401baaa7a3"
        self.client_secret = "914c6f83402a47e3afe625a68f54cbb2"
        self.token = self._get_new_token()

    def get_songs_by_years(self, years,amount):
        '''years in format i.e. 2020-2025, amount of songs received '''
        token=self._get_new_token()
        url = "https://api.spotify.com/v1/search"
        headers= self._get_auth_header(token)
        query= "q=year%3A"+ years +"&type=track&limit=50&offset=0"
        query_url = url+"?"+query
        result=get(query_url, headers=headers)
        json_result=json.loads(result.content)
        track_urls=[]
        track_names=[]
        items = json_result['tracks']['items']
        perm = self.permutate(len(items))
        songs_amount = [items[perm[i]] for i in range(amount)]
        for track in songs_amount:
            track_url=track['external_urls']['spotify']
            track_urls.append(track_url)
            track_name=track['name']
            track_names.append(track_name)
        return track_names, track_urls

    def get_genre_songs_urls(self, genre, amount):
        token = self._get_new_token()
        url = "https://api.spotify.com/v1/search"
        headers = self._get_auth_header(token)
        query = f"q=genres%3A%5B%22{genre}%22%5D&type=track&limit=20"
        query_url = url + "?" + query
        result = get(query_url, headers=headers)
        json_result = json.loads(result.content)
        track_urls = []
        track_names = []
        items = json_result['tracks']['items']
        perm = self.permutate(len(items))
        songs_amount = [items[perm[i]] for i in range(amount)]
        for track in songs_amount:
            track_url = track['external_urls']['spotify']
            track_urls.append(track_url)
            track_name = track['name']
            track_names.append(track_name)
        return track_names, track_urls

    def _get_new_token(self):
        auth_string = self.client_id + ":" + self.client_secret
        auth_bytes = auth_string.encode("utf-8")
        auth_base64 = str(base64.b64encode(auth_bytes), "utf-8")

        url = "https://accounts.spotify.com/api/token"
        headers = {
            "Authorization": "Basic " + auth_base64,
            "Content-Type": "application/x-www-form-urlencoded"
        }
        data = {"grant_type": "client_credentials"}
        result = post(url, headers=headers, data=data)
        json_result = json.loads(result.content)
        token = json_result["access_token"]
        return token

    def _get_auth_header(self, token):
        return {"Authorization": "Bearer " + token}

    def permutate(self, amount):
        perm = [i for i in range(amount)]
        for i in range(amount):
            rand = random.randint(0, amount - 1)
            perm[0], perm[rand] = perm[rand], perm[0]
        return perm