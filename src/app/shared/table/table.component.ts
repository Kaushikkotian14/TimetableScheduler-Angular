import { Component,Input,OnInit } from '@angular/core';
import { Timetable } from '../models/timetable.model';

interface TableColumn {
  name: string;
  header: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
@Input() displayedColumns: string[] = [];
@Input() dataSource: Timetable[] = [];

filter:Timetable[];
searchTerm:string ='';
noItem=false;

ngOnInit():void{
 this.filter= this.dataSource;
}

search(){
if(!this.searchTerm){
this.noItem = false
}

if(this.searchTerm && this.filter.length === 0){
this.noItem=true;
} 

this.filter=this.dataSource.filter(dataSource=>
  dataSource?.professor.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
dataSource?.title.toLowerCase().includes(this.searchTerm.toLowerCase()) 
);

}

  }

