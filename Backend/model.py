from pydantic import BaseModel

class timeTable(BaseModel):
    # id:str
    title:str
    start:str
    end:str
    date:str
    professor:str
    roomNo:str
