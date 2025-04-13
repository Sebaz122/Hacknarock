from pydantic import BaseModel

class Song(BaseModel):
    name: str
    url: str
    category: str