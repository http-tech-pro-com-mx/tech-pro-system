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
import { RptAttendanceConcentratedComponent } from './rpt-attendance-concentrated/rpt-attendance-concentrated.component';
import { AuthGuardSecurity } from '../auth/auth.guard.security';

const routesAttendance: Routes = [
  {
    path: 'quincenas', component: QuincenaComponent, canActivate: [AuthGuardSecurity],
    data: {
      expectedRole: 'ROLE_CONSULTA_QUINCENA'
    }
  },
  {
    path: 'justication/:id', component: FormJustificationComponent, canActivate: [AuthGuardSecurity],
    data: {
      expectedRole: 'ROLE_CREA_JST'
    }
  },
  {
    path: 'justication/employees/crear', component: FormJustificationJefeComponent, canActivate: [AuthGuardSecurity],
    data: {
      expectedRole: 'ROLE_CREA_JST_EMPLEADO'
    }
  },
  {
    path: 'report-justication', component: RptJustificationComponent, canActivate: [AuthGuardSecurity],
    data: {
      expectedRole: 'ROLE_CONSULTA_JST'
    }
  },
  {
    path: 'report', component: RptAttendanceComponent, canActivate: [AuthGuardSecurity],
    data: {
      expectedRole: 'ROLE_RPT_INDIVIDUAL'
    }
  },
  {
    path: 'report-admin', component: RptAttendanceAdminComponent, canActivate: [AuthGuardSecurity],
    data: {
      expectedRole: 'ROLE_RPT_ADMIN'
    }
  },
  {
    path: 'report-concentrated', component: RptAttendanceConcentratedComponent, canActivate: [AuthGuardSecurity],
    data: {
      expectedRole: 'ROLE_RPT_CONCENTRADO'
    }
  }
];

@NgModule({
  declarations: [
    RptAttendanceComponent,
    QuincenaComponent,
    FormJustificationComponent,
    RptJustificationComponent,
    RptAttendanceAdminComponent, FormJustificationJefeComponent, RptAttendanceConcentratedComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routesAttendance)
  ],
  providers: [
    AuthGuardSecurity
  ]
})
export class AttendanceModule { }
