import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { RptAttendanceComponent } from './rpt-attendance/rpt-attendance.component';
import { ConfAttendanceComponent } from './conf-attendance/conf-attendance.component';
import { FormJustificationComponent } from './form-justification/form-justification.component';
import { RptJustificationComponent } from './rpt-justification/rpt-justification.component';
import { OutstandingJusticationComponent } from './outstanding-justication/outstanding-justication.component';
import { RptAttendanceAdminComponent } from './rpt-attendance-admin/rpt-attendance-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routesAttendance: Routes = [
  { path: 'report', component: RptAttendanceComponent },
  { path: 'config', component: ConfAttendanceComponent },
  { path: 'justication', component: FormJustificationComponent },
  { path: 'report-justication', component: RptJustificationComponent },
  { path: 'outstanding-justication', component: OutstandingJusticationComponent },
  { path: 'report-admin', component: RptAttendanceAdminComponent }
];

@NgModule({
  declarations: [RptAttendanceComponent, ConfAttendanceComponent, FormJustificationComponent, RptJustificationComponent, OutstandingJusticationComponent, RptAttendanceAdminComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule, 
    ReactiveFormsModule,
    RouterModule.forChild(routesAttendance)
  ]
})
export class AttendanceModule { }
