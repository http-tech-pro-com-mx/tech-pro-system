import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { RptAttendanceComponent } from './rpt-attendance/rpt-attendance.component';
import { QuincenaComponent } from './quincenas/quincenas.component';
import { FormJustificationComponent } from './form-justification/form-justification.component';
import { RptJustificationComponent } from './rpt-justification/rpt-justification.component';
import { RptAttendanceAdminComponent } from './rpt-attendance-admin/rpt-attendance-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routesAttendance: Routes = [
  { path: 'report', component: RptAttendanceComponent },
  { path: 'quincenas', component: QuincenaComponent },
  { path: 'justication/:id', component: FormJustificationComponent },
  { path: 'report-justication', component: RptJustificationComponent },
  { path: 'report-admin', component: RptAttendanceAdminComponent }
];

@NgModule({
  declarations: [
    RptAttendanceComponent, 
    QuincenaComponent, 
    FormJustificationComponent, 
    RptJustificationComponent, 
    RptAttendanceAdminComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule, 
    ReactiveFormsModule,
    RouterModule.forChild(routesAttendance)
  ]
})
export class AttendanceModule { }
