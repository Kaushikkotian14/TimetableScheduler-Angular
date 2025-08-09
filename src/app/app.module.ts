import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { SharedRoutingModule } from './shared/shared-routing.module';
import {DialogComponent} from '../app/component/dialog/dialog.component';
import { SchedulerComponent } from '../app/component/scheduler/scheduler.component';

@NgModule({
  declarations: [
    AppComponent, 
    SchedulerComponent,
    DialogComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule, 
    SharedRoutingModule   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
// json-server --watch db.json --port 3000