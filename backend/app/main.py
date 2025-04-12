from email.policy import default

from fastapi import FastAPI

app=FastAPI()

@app.get("/")
async def root() :
    return {"message" : "Hello World"}

@app.get("/hardcoded")
async def hardcoded_example():
    return {""}


@app.get("/daily")
async def hardcoded_example():
    return {""}

@app.get("/random")
async def daily():
    return {""}