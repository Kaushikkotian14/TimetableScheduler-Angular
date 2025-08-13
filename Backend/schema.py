def schedule(timeTable):
    return{
        "id":str(timeTable["_id"]),
        "title":timeTable["title"],
        "start":timeTable["start"],
        "end":timeTable["end"],
        "date":timeTable["date"],
        "professor":timeTable["professor"],
        "roomNo":timeTable["roomNo"]
    }

def all_data(timeTables):
    return [schedule(timeTable) for timeTable in timeTables]