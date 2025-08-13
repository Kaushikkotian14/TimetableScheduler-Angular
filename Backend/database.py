from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db_client = client["calender"]

schedule_collecction = db_client["schedule"]
 