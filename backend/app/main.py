from datetime import datetime
from email.policy import default

from pydantic import BaseModel
from fastapi import FastAPI,status
from fastapi.responses import JSONResponse

app=FastAPI()
streak={}
date={}

class User(BaseModel):
    id:str
    streak:int
    last_update:datetime

@app.get("/")
async def root() :
    return {"message" : "Hello World"}

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
