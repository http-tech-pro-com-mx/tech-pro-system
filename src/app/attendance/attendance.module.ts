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
import { FormJustificationJefeComponent } from './form-justification-jefe/form-justification-jefe.component';

const routesAttendance: Routes = [
  { path: 'report', component: RptAttendanceComponent },
  { path: 'quincenas', component: QuincenaComponent },
  { path: 'justication/:id', component: FormJustificationComponent },
  { path: 'justication/employees/crear', component: FormJustificationJefeComponent },
  { path: 'report-justication', component: RptJustificationComponent },
  { path: 'report-admin', component: RptAttendanceAdminComponent }
];

@NgModule({
  declarations: [
    RptAttendanceComponent, 
    QuincenaComponent, 
    FormJustificationComponent, 
    RptJustificationComponent, 
    RptAttendanceAdminComponent, FormJustificationJefeComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule, 
    ReactiveFormsModule,
    RouterModule.forChild(routesAttendance)
  ]
})
export class AttendanceModule { }
