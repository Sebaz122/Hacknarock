import json
from random import choice

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

if __name__=="__main__":
    print(prepare_songs_and_genres())