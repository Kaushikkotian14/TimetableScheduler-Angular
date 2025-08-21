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
 columns:string[]=['date','subject','professor','room no','timing'];
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
      center: 'prevYear prev title next nextYear',
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

    // when clicked on date Add schedule form is open to add task
    dateClick:this.dialogShow.bind(this),
 
    // when clicked on event dialog box should appear
   eventClick: (arg) => {
       const dialogRef = this.dialog.open(EventDialogComponent, {
        width: '300px',
        data: {
          title: arg.event.title,
          date: arg.event.start.toLocaleDateString(),
          professor: arg.event.extendedProps['professor'],
          roomNo: arg.event.extendedProps['roomNo'],
          start: arg.event.start,
          end: arg.event.end,
          id:arg.event._def.publicId,
        },    
        
      });
           
      if(dialogRef.componentInstance.delete.subscribe((data)=>{
        console.log(data);
         if(data){
      const StoredE = this.calendarOptions.events as Timetable[]
      const newArray = StoredE.filter((p)=> p.id !== arg.event._def.publicId)
      this.calendarOptions.events = [...newArray]
         }
        
      }))
       this.getData()
      console.log("event",this.calendarOptions.events)
   
    },
    
  // modify displayed contents on calender
  eventContent: function(arg) {
  return {
    html: `
 <mat-container >
        <mat-container >${arg.event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${arg.event.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</mat-container >
        <mat-container >${arg.event.title}</mat-container ><br>
      </mat-container>    `
  }
}
}

    //  to get data from service
getData(){
  this.timetableService.getData().subscribe(timetable => {
    this.timetable = timetable;
    console.log("e",this.timetable);
    
    this.calendarOptions = {
      ...this.calendarOptions,
      events: this.timetable
      
    };
  });
// console.log("e",this.timetable);
}

//hide and show dialogbox and calender
dialogShow(arg){
  const today = new Date();
  const d = new Date(arg.dateStr)
   today.setHours(5);
   today.setMinutes(29);
   today.setSeconds(0);
console.log(today,d);

  if(d>= today){
localStorage.setItem('date', arg.dateStr);
this.route.navigate(['/add-schedule']);
    console.log("d",arg);
}

}

// toggle between calender and table
showTable(){
  this.table=!this.table;
  this.getData();
}

// to pass radio input to fullcalender component
radio(input:string){
  this.inputElement.getApi().changeView(input); 
}

}


