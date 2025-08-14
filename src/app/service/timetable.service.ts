import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Timetable } from '../shared/models/timetable.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class TimetableService {
  table:Timetable[]=[];
private apiUrl = 'http://localhost:8000'; 
  constructor(private http: HttpClient) { }

  getData(): Observable<Timetable[]> {
    return this.http.get<Timetable[]>(`${this.apiUrl}/schedule`);
  }

  addData(table:Timetable[]):Observable<Timetable>{
     return this.http.post<Timetable>(`${this.apiUrl}/schedule`,table);
  }

  deleteData(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/schedule/${id}`);
  }


}
