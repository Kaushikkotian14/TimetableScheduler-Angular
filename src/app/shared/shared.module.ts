import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { ReactiveFormsModule } from '@angular/forms'; 
import { FullCalendarModule } from '@fullcalendar/angular';
import { HttpClientModule } from '@angular/common/http';
import { TableComponent } from './table/table.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';


@NgModule({
  declarations: [
     TableComponent,

     
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MatFormFieldModule,
    MatNativeDateModule,
    FullCalendarModule,
    HttpClientModule,
    ReactiveFormsModule,

    MatDialogModule,
    MatFormFieldModule,    
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
    
    MatNativeDateModule,
    MatDatepickerModule,  
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,     
    MatIconModule,
    MatTableModule,
    MatRadioModule,   
    MatSnackBarModule,
    MatDialogModule,

  ],
  
})
export class SharedModule { }
