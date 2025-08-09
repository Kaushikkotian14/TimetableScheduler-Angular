import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { HttpClientModule } from '@angular/common/http';


import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { TableComponent } from './table/table.component';
import {MatTabsModule} from '@angular/material/tabs';
 import { MatTableModule } from '@angular/material/table';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';


@NgModule({
  declarations: [
     TableComponent,

     
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    FullCalendarModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,

    MatButtonModule,
    MatCardModule,
    MatInputModule,     
    MatIconModule,
    MatTabsModule,
    MatTableModule,
   MatDatepickerModule,
   MatRadioModule



     
    
  ],
  
  exports:[
    CommonModule,
    SharedRoutingModule,
    
    TableComponent,
    FullCalendarModule,
    HttpClientModule,


    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule, 
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,

     MatButtonModule,
    MatCardModule,
    MatInputModule,     
    MatIconModule,
    MatTableModule,
   MatTabsModule,
   MatRadioModule
  ],
  
})
export class SharedModule { }
