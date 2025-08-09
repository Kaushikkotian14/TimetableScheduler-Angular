import { Component,Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Inject } from '@angular/core';
import { Timetable} from 'src/app/shared/models/timetable.model';
import { TimetableService } from 'src/app/service/timetable.service';
 import { MatSnackBar } from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {inject} from '@angular/core';



@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  form :FormGroup; 
  timetable:Timetable[]=[]
 date= localStorage.getItem('date') || '';
route= inject(Router);

 constructor(

    private fb: FormBuilder,
    private timetableService: TimetableService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      title: [ '', [Validators.required]],
       start:['',[Validators.required]],
        end:['',[Validators.required]],
       date:[this.date]
    });
  }

  //get data from service
  getData(){
  this.timetableService.getData().subscribe(timetable => {
    this.timetable = timetable;
  });
console.log(this.timetable);
}
 
//add data to db.json
  onSubmit() {
    if (this.form.valid) {
      const controls = [ 'start', 'end'];
     controls.forEach(controlName => {
    const currentValue = this.form.get(controlName)?.value;
    this.form.get(controlName)?.setValue(  this.date+'T'+currentValue);

  });
      // this.form.setValue('this.date)
      if(!this.date){
    this.form.get('date').setValue(this.date);}
     this.timetable=this.form.value;
      
      this.timetableService.addData(this.timetable).subscribe({
        next:()=>{

         this.getData();
        }
        
        
      })
      this.form.reset()
      this.snackBar.open('Schedule added successfully!', 'Close', {
        duration: 2000,
      });
      this.route.navigate(['']);
      localStorage.removeItem('date');
      console.log(this.form);
      console.log(this.timetable);
      
    }
  }

  cancel(){
    localStorage.removeItem('date');
    this.form.reset();
    this.snackBar.open('Schedule cancelled!', 'Close', {
      duration: 2000,
    });
    this.route.navigate(['']);
  }
  
}