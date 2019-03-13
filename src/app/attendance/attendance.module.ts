import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RptAttendanceComponent } from './rpt-attendance/rpt-attendance.component';
import { ConfAttendanceComponent } from './conf-attendance/conf-attendance.component';


const routesAttendance: Routes = [
  { path: 'reports', component: RptAttendanceComponent },
  { path: 'config', component: ConfAttendanceComponent }
];

@NgModule({
  declarations: [RptAttendanceComponent, ConfAttendanceComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routesAttendance)
  ]
})
export class AttendanceModule { }
