import { Component,OnInit,Input } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarOptions } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';

import { TimetableService } from 'src/app/service/timetable.service';
import { Timetable } from '../models/timetable.model';


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
  timetable:Timetable[]=[];
 @Input() time:Timetable[]=[];
 showdialog :boolean=false;
 showTable:boolean=false;
 date:string='';
 columns:string[]=['date','title','start','end'];
  column: TableColumn[] = [
  { name: 'title', header: 'Event Title' },
  { name: 'start', header: 'Start Date' },
  { name: 'end', header: 'End Date' }
];


constructor(private timetableService:TimetableService){}

  ngOnInit(): void {
     this.getData();
    this.updateEvent(this.time);
    console.log('s',this.time);
  }

  // used to open/close dialog box
  dialog(){
    this.showdialog=!this.showdialog    
  }
 
    calendarOptions: CalendarOptions = {
    plugins: [ dayGridPlugin, timeGridPlugin, listPlugin,interactionPlugin ],
    initialView: 'dayGridMonth',
    customButtons: {
      myCustomButton: {
        text: 'Add ',
        click: this.dialogShow.bind(this) 
      } 
    },
    headerToolbar: {
      left: 'today',
      center: 'prev title next',
      right: 'myCustomButton dayGridMonth timeGridWeek listMonth'
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
      const start = arg.event.start;
      const end = arg.event.end;
      alert(`Subject: ${arg.event.title}\n Time: ${arg.event.start?.toString().padStart(2,'0')} - ${end}`);
    },

    events:[],

  eventContent: function(arg) {
   const formatTime = (date: Date | null): string => {
    if (!date) return '';
    let h = date.getHours();
    const m = date.getMinutes().toString().padStart(2, '0');
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return `${h}:${m} ${ampm}`;
  }

  const start = formatTime(arg.event.start);
  const end = formatTime(arg.event.end);
      
  return {
    html: `
 <mat-container class="custom-event">
        <mat-container  class="event-time">${start} - ${end}</mat-container >
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
    this.updateEvent(this.timetable);
  });
console.log(this.timetable);
}

// to add event attribute in calenderoptions
 updateEvent(timetable:Timetable[]){
this.calendarOptions = {
      ...this.calendarOptions,
      events: this.timetable
    };
    console.log("update",this.timetable)
}

//hide and show dialogbox and calender
dialogShow(arg:any){
this.showdialog=!this.showdialog
this.date=arg.dateStr;
console.log(arg);
   console.log(arg.dateStr);
}


}


