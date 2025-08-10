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
import { EventDialogComponent } from '../event-dialog/event-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
 columns:string[]=['date','title','professor','roomNo','start','end'];
  column: TableColumn[] = [
  { name: 'title', header: 'Event Title' },
  { name: 'start', header: 'Start Date' },
  { name: 'end', header: 'End Date' }
];
route= inject(Router);



constructor(private timetableService:TimetableService, private dialog:MatDialog){}

  ngOnInit(): void {
     this.getData();    
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
            this.dialog.open(EventDialogComponent, {
        width: '300px',
        data: {
          title: arg.event.title,
          date: arg.event.start.toLocaleDateString(),
          professor: arg.event.extendedProps['professor'],
          roomNo: arg.event.extendedProps['roomNo'],
          start: arg.event.start,
          end: arg.event.end,
        }
    
      });
      

    },

    events:[],
  
  eventContent: function(arg) {
  return {
    html: `
 <mat-container >
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
    console.log("d",arg);
}

showTable(){
  this.table=!this.table;
}

radio(input:string){
  this.inputElement.getApi().changeView(input); 
}

}


