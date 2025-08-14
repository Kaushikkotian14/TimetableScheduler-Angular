from sqlalchemy import Boolean, Column,Integer,String
from database import Base

class timeTable(Base):
    __tablename__ = 'schedules'

    id = Column(Integer, primary_key=True, index=True,autoincrement= True) 
    title=Column(String(50))
    start=Column(String(50))
    end=Column(String(50))
    date=Column(String(50))
    professor=Column(String(50))
    roomNo=Column(String(50))


# select * from  schedules

# UPDATE schedules
# SET title = "Physics"
#  WHERE id=4;