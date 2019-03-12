import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RptAttendanceComponent } from './rpt-attendance/rpt-attendance.component';


const routesAttendance: Routes = [
  {
    path: 'reporte', component: RptAttendanceComponent
    // data: {
    //   expectedRole: 56
    // }
  }];

@NgModule({
  declarations: [RptAttendanceComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routesAttendance)
  ]
})
export class AttendanceModule { }
