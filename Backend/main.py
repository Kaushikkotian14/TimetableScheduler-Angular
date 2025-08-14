from fastapi import FastAPI, APIRouter,HTTPException,Depends,status
from pydantic import BaseModel
from typing import Annotated
from database import engine,SessionLocal
from sqlalchemy.orm import Session
import model
from fastapi.middleware.cors import CORSMiddleware



app=FastAPI()
router = APIRouter()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model.Base.metadata.create_all(bind=engine)

class timeTable(BaseModel):
    title:str
    start:str
    end:str
    date:str
    professor:str
    roomNo:str

def get_db():
    db=SessionLocal()
    try:
        yield db
    finally:
        db.close()
    
db_dependency = Annotated[Session, Depends(get_db)]

@app.get("/schedule",status_code=status.HTTP_200_OK)
async def getData(db:db_dependency):
    data=db.query(model.timeTable).all()
    if data is None:
        raise HTTPException(status_code=404, details='Schedule not found')
    return data

@app.get("/schedule/{id}",status_code=status.HTTP_200_OK)
async def getDataById(id:int, db:db_dependency):
    data=db.query(model.timeTable).filter(model.timeTable.id == id).first()
    if data is None:
        raise HTTPException(status_code=404, details='Schedule not found')
    return data

@app.post("/schedule",status_code=status.HTTP_201_CREATED)
async def addData(data: timeTable, db:db_dependency ):
    data = model.timeTable(**data.model_dump())
    db.add(data)
    db.commit()
    db.refresh(data)

@app.put("/schdeule/{id}",status_code=status.HTTP_200_OK)
async def updateData(id:int,input: timeTable,db:db_dependency):
    data=db.query(model.timeTable).filter(model.timeTable.id == id).first()
    if data is None:
        raise HTTPException(status_code=404, details='Schedule not found')
    data.title= input.title
    data.start= input.start
    data.end=input.end
    data.professor=input.professor
    data.roomNo=input.roomNo
    db.commit()
    db.refresh(data)
    

@app.delete("/schedule/{id}",status_code=status.HTTP_200_OK)
async def delete(id:int, db:db_dependency):
    data=db.query(model.timeTable).filter(model.timeTable.id == id).first()
    if data is None:
        raise HTTPException(status_code=404, details='Schedule not found')
    db.delete(data)
    db.commit()
    db.refresh(data)

# python -m uvicorn main:app --reload
# myenv\Scripts\activate
