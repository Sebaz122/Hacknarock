from random import randint
from datetime import datetime
from email.policy import default

from pydantic import BaseModel
from fastapi import FastAPI,status
from fastapi.responses import JSONResponse
from typing import List
from app.utils.external_apis import ExternalApis

from app.utils.Song import Song

app=FastAPI()
streak={}
date={}
users={}
external_apis = ExternalApis()

periods = ["2020-2025", "2010-2019", "2000-2009", "1990-1999", "1980-1989", "1970-1979", "1960-1969", "1950-1959"]
formatted_periods = ["2020s", "2010s", "2000s", "90s", "80s", "70s", "60s", "Before", "Celtic"]

class User(BaseModel):
    id:str
    streak:int
    last_update:datetime

@app.get("/streak/increment")
async def increment_streak(user_id:str,current_date:datetime):
    if not user_id in streak:
        streak[user_id]=0
    streak[user_id]+=1
    date[user_id]=current_date
    return JSONResponse(status_code=status.HTTP_200_OK,content="ok")

@app.get("/streak/reset")
async def reset_streak(user_id:str,current_date:datetime):
    if not user_id in streak:
        streak[user_id]=0
    streak[user_id] = 0
    date[user_id]=current_date
    return JSONResponse(status_code=status.HTTP_200_OK,content="ok")

@app.get("/streak/get")
async def get_streak(user_id:str):
    return {"streak":streak[user_id],"lastUpdate":date[user_id]}

@app.get("/random", response_model=List[Song])
async def daily():
    periods_to_request = [0 for _ in range(9)]
    for i in range(9):
        rand = randint(0,8)
        periods_to_request[rand] += 1
    print(periods_to_request)
    songs_to_return = []
    for i in range(len(periods_to_request) - 1):
        if periods_to_request[i] > 0:
            track_names, track_urls = external_apis.get_songs_by_years(periods[i], periods_to_request[i])
            for j in range(len(track_names)):
                songs_to_return.append(Song(name = track_names[j], url = track_urls[j], category = formatted_periods[i]))
    if periods_to_request[8] > 0:
        track_names, track_urls = external_apis.get_genre_songs_urls("Nordic Folk", periods_to_request[8])
        for j in range(len(track_names)):
            songs_to_return.append(Song(name=track_names[j], url=track_urls[j], category=formatted_periods[8]))
    print(songs_to_return)
    return songs_to_return