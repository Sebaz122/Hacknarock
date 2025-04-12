from email.policy import default

from pydantic import BaseModel
from fastapi import FastAPI,status
from fastapi.responses import JSONResponse

app=FastAPI()
users={}

class User(BaseModel):
    id:str
    streak:int

@app.get("/")
async def root() :
    return {"message" : "Hello World"}

@app.get("/streak/increment")
async def hardcoded_example(user_id:str):
    if not user_id in users:
        users[user_id]=0
    users[user_id]+=1
    return JSONResponse(status_code=status.HTTP_200_OK)

@app.get("/streak/reset")
async def hardcoded_example(user_id:str):
    if not user_id in users:
        users[user_id]=0
    users[user_id] = 0
    return JSONResponse(status_code=status.HTTP_200_OK)

@app.get("/streak/get")
async def hardcoded_example(user_id:str):
    return {"Streak":users[user_id]}
