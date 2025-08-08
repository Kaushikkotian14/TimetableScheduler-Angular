import { Component,Input } from '@angular/core';
import { Timetable } from '../models/timetable.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
@Input() displayedColumns: string[] = [];
@Input() dataSource: Timetable[] = [];


 formatTime(date: string | null): String {
     let d: Date = new Date(date!);
    let t = d.toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }); 
    return t ;
  }

  formatDate(date: string | null): String {

     let d: Date = new Date(date!);
         let nd = d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }); 
    
    return nd ;
  }

  length(date: string ):String{
   const part1 = date!.slice(11,16);
     return part1;
    }
      length2(date: string ):String{
   const part1 = date!.slice(0,10);
     return part1;
    }
  }

