import { Component,OnInit,Input,ViewChild,ElementRef } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarOptions } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';

import {Router} from '@angular/router';
import {inject} from '@angular/core';
import { TimetableService } from 'src/app/service/timetable.service';
import { Timetable } from 'src/app/shared/models/timetable.model';
import { FullCalendarComponent } from '@fullcalendar/angular';


interface TableColumn {
  name: string;
  header: string;
}

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements OnInit {
 @ViewChild('input') inputElement: FullCalendarComponent;
  timetable:Timetable[]=[];
 @Input() time:Timetable[]=[];
 showdialog :boolean=false;
 table:boolean=false;
 date:string='';
 columns:string[]=['date','title','start','end'];
  column: TableColumn[] = [
  { name: 'title', header: 'Event Title' },
  { name: 'start', header: 'Start Date' },
  { name: 'end', header: 'End Date' }
];
route= inject(Router);



constructor(private timetableService:TimetableService){}

  ngOnInit(): void {
     this.getData();
    
    console.log('s',this.time);
  }


  
 
    calendarOptions: CalendarOptions = {
    plugins: [ dayGridPlugin, timeGridPlugin, listPlugin,interactionPlugin ],
    initialView: 'dayGridMonth',
    customButtons: {
      addSchedule: {
        text: 'Add Schedule',
        click: this.dialogShow.bind(this) 
      }
    },
    headerToolbar: {
      left:'',
      center: 'prev title next',
      right: ''
      // ,timeGridDay,
    },
     
    weekends: true,
    dayMaxEvents: true,
    selectable: true,
    editable: true,
    selectMirror: true,

    select: function(info) {
      // alert('selected ' + info.startStr + ' to ' + info.endStr);
    },
    dateClick:this.dialogShow.bind(this),

   eventClick: (arg) => {
      
      alert(`Subject: ${arg.event.title}\n Time: ${arg.event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${arg.event.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
    },

    events:[],
  

  eventContent: function(arg) {
  //  const formatTime = (date: Date | null): string => {
  //   if (!date) return '';
  //   let h = date.getHours();
  //   const m = date.getMinutes().toString().padStart(2, '0');
  //   const ampm = h >= 12 ? 'PM' : 'AM';
  //   h = h % 12 || 12;
  //   return `${h}:${m} ${ampm}`;
  // }

  // const start = formatTime(arg.event.start);
  // const end = formatTime(arg.event.end);
      
  return {
    html: `
 <mat-container class="custom-event">
        <mat-container  class="event-time">${arg.event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${arg.event.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</mat-container >
        <mat-container  class="event-title">${arg.event.title}</mat-container >
      </mat-container>
    `
  }
}

}


    //  to get data from service
getData(){
  this.timetableService.getData().subscribe(timetable => {
    this.timetable = timetable;
    this.calendarOptions = {
      ...this.calendarOptions,
      events: this.timetable
    };
  });
console.log(this.timetable);
}

//hide and show dialogbox and calender
dialogShow(arg:any){
localStorage.setItem('date', arg.dateStr);
this.route.navigate(['/add-schedule']);
console.log(arg);
   console.log(arg.dateStr);
}

showTable(){
  this.table=!this.table;
}

radio(input:string){
  this.inputElement.getApi().changeView(input);
}


}


