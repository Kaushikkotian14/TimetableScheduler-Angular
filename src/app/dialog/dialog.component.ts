import { Component,Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Inject } from '@angular/core';
import { Timetable } from '../shared/models/timetable.model';
import { TimetableService } from '../service/timetable.service';
 import { MatSnackBar } from '@angular/material/snack-bar';





@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  form :FormGroup; 
  timetable:Timetable[]=[]
  @Input() date= '';
 constructor(

    private fb: FormBuilder,
    private timetableService: TimetableService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      title: [ '', [Validators.required]],
       start:['',[Validators.required]],
        end:['',[Validators.required]],
        date:['']
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
         alert("Book Added Sucessfully!!");
         this.getData();
        }
        
        
      })
      this.form.reset()
      location.reload();
      console.log(this.form);
      console.log(this.timetable);
      
    }
  }

  cancel(){
    location.reload();
  }
  
}