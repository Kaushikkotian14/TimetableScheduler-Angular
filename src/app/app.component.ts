import { Component, OnInit } from '@angular/core';
import { TimetableService } from './service/timetable.service';
import { Timetable } from './shared/models/timetable.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
timetable:Timetable[]=[];
  constructor(private timetableService:TimetableService){}
 
  ngOnInit(): void {
    this.getData();
  }

  getData(){
  this.timetableService.getData().subscribe(timetable => {
    this.timetable = timetable;
  });
console.log('p',this.timetable);
}

  


}
