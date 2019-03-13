import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RptAttendanceComponent } from './rpt-attendance/rpt-attendance.component';
import { ConfAttendanceComponent } from './conf-attendance/conf-attendance.component';
import { FormJustificationComponent } from './form-justification/form-justification.component';
import { RptJustificationComponent } from './rpt-justification/rpt-justification.component';


const routesAttendance: Routes = [
  { path: 'report', component: RptAttendanceComponent },
  { path: 'config', component: ConfAttendanceComponent },
  { path: 'justication', component: FormJustificationComponent },
  { path: 'report-justication', component: RptJustificationComponent }
];

@NgModule({
  declarations: [RptAttendanceComponent, ConfAttendanceComponent, FormJustificationComponent, RptJustificationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routesAttendance)
  ]
})
export class AttendanceModule { }
