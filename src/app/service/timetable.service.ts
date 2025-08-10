import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Timetable } from '../shared/models/timetable.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class TimetableService {
  table:Timetable[]=[];
private apiUrl = 'http://localhost:3000'; 
  constructor(private http: HttpClient) { }

  getData(): Observable<Timetable[]> {
    return this.http.get<Timetable[]>(`${this.apiUrl}/Timetable`);
  }

  addData(table:Timetable[]):Observable<Timetable>{
     return this.http.post<Timetable>(`${this.apiUrl}/Timetable`,table);
  }


}
