import { Component,OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Inject } from '@angular/core';
import { Timetable} from 'src/app/shared/models/timetable.model';
import { TimetableService } from 'src/app/service/timetable.service';
 import { MatSnackBar } from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  form :FormGroup; 
  timetable:Timetable[]=[]
 date=new Date(localStorage.getItem('date')).toISOString().split('T')[0] ;
msg:string='';
edit = false;
id: string;



// 

  // Method to handle the form submission
 constructor(
    private fb: FormBuilder,
    private timetableService: TimetableService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private route: Router,
  ) {
    this.form = this.fb.group({
      title: [ '', [Validators.required]],
      professor: [ '', [Validators.required]],
      roomNo: [ '', [Validators.required]],
       start:['',[Validators.required]],
        end:['',[Validators.required]],
       date:[this.date ? this.date : '' ]
    });
    
  }

  ngOnInit() {
     this.id = this.activatedRoute.snapshot.paramMap.get('id') || '';
    if (this.id) {
      this.edit = true;
      this.loadData();
    }
  }

  loadData() {
   this.timetableService.getDataById(this.id).subscribe((data: any) => {
    this.form.patchValue({
      title: data.title,
      professor: data.professor,
      roomNo: data.roomNo,
      date: data.date,
      start: data.start.split('T')[1],
      end: data.end.split('T')[1]
    });
  });


  }



// }

  //get data from service
  getData(){
  this.timetableService.getData().subscribe(timetable => {
    this.timetable = timetable;
  });
console.log(this.timetable);
}

checkTime() {
  let e=new Date(`${this.date}T${this.form.get('end').value}`) 
  let s =new Date(`${this.date}T${this.form.get('start').value}`)
  if ( e.getTime() <= s.getTime()) {
    this.msg="Invalid Endtime";
    alert("Invalid Endtime")
    this.form.get('end')?.reset();
   }
}


 
//add data to db.json
    onSubmit() {
    if (this.form.valid) {
      const controls = [ 'start', 'end'];
     controls.forEach(controlName => {
    const currentValue = this.form.get(controlName)?.value;
    this.form.get(controlName)?.setValue( this.date+'T'+currentValue);
     

    if(this.date===''){
    this.form.get('date').setValue(this.date.split('T')[0]);}
     this.timetable=this.form.value;
  });  
      if (this.edit) {
        // update record
        this.timetableService.updateData(this.id, this.form.value).subscribe(() => {
          this.snackBar.open('Schedule updated successfully!', 'Close', { duration: 2000 });
          this.route.navigate(['']);
        });
      } else {
        // add new record
        
        this.timetableService.addData(this.form.value).subscribe(() => {
          this.snackBar.open('Schedule added successfully!', 'Close', { duration: 2000 });
          this.route.navigate(['']);
        });
      
    }
  }
}


  //to getback to schedular component
  cancel(){
    localStorage.removeItem('date');
    this.form.reset();
    this.snackBar.open('Schedule cancelled!', 'Close', {
      duration: 2000,
    });
    this.route.navigate(['']);
  }
  
}