import { Component,Inject,  EventEmitter,  Output, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TimetableService } from 'src/app/service/timetable.service';
import { Timetable} from 'src/app/shared/models/timetable.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
})
export class EventDialogComponent {
timetable:Timetable[]=[];

@Output() delete = new EventEmitter<boolean>(); 
  constructor(
    public dialogRef: MatDialogRef<EventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private timeTable:TimetableService, private snackBar: MatSnackBar, private route:Router
  ) {
    console.log('ed',this.data)
  }
  

  // to close dialog box
  close(): void {
    this.dialogRef.close();
  }

  // to detdata from service
  getData(){
   this.timeTable.getData().subscribe(data => {
    this.timetable = data;
  console.log("d",this.timetable)})
    // console.log(this.timetable)
  }

  // to delete data  
  deleteData(id: string) {
    if (confirm('Are you sure you want to delete this schedule?')) {
      this.delete.emit(true)
      this.timeTable.deleteData(id).subscribe(
        () => {
          this.snackBar.open('Schedule deleted successfully!', 'Close', {
            duration: 2000,
          });
          this.getData();
          this.dialogRef.close();
          // location.reload()

        },
        error => {
          this.snackBar.open('Error deleting Schedule', 'Close', {
            duration: 2000,
          });
          console.error('Error deleting Schedule:', error);
        }
      );
    }
  }
 
edit(id:string){
  this.close();
  localStorage.setItem('date', this.data.date);
this.route.navigate(['/add-schedule/',this.data.id]);
console.log(this.data);

}
  
}
