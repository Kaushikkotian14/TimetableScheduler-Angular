from fastapi import FastAPI, APIRouter,HTTPException
from database import schedule_collecction
from schema import all_data
from model import timeTable

app=FastAPI()
router = APIRouter()


@router.get("/")
async def all_data():
    data = schedule_collecction.find()
    return all_data(data)

@router.post("/")
async def add_schdeule(new_schdeule : timeTable):
    try:
        resp = schedule_collecction.insert_one(dict(new_schdeule))
        return{"status_code":200, "id":str(resp.inserted_id)}
    except Exception as e:
        return HTTPException(status_code=500, detail="Some error occured{e}")

app.include_router(router)


# python -m uvicorn main:app --reload

