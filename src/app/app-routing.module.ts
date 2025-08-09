import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { SchedulerComponent } from '../app/component/scheduler/scheduler.component';
import { TableComponent } from '../app/shared/table/table.component';
import {DialogComponent} from '../app/component/dialog/dialog.component';


const routes: Routes = [
  // /{path:'table',component:TableComponent},
  {path:'', component:SchedulerComponent},
  {path:'add-schedule', component:DialogComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
