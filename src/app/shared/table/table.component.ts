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


  // length(date: string ):String{
  //  const part1 = date!.slice(11,16);
  //    return part1;
  //   }
  //     length2(date: string ):String{
  //  const part1 = date!.slice(0,10);
  //    return part1;
  //   }
  }

