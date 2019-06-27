import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from './perfil/perfil.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipeModule } from '../pipe/pipe.module';
import { ListUsersComponent } from './list-users/list-users.component';
import { PerfilEmpleadoComponent } from './perfil-empleado/perfil-empleado.component';
import { AuthGuardSecurity } from '../auth/auth.guard.security';

const routesUser: Routes = [
  { path: 'perfil', component: PerfilComponent },
  {
    path: 'empleados/perfil/:username', component: PerfilEmpleadoComponent, canActivate: [AuthGuardSecurity],
    data: {
      expectedRole: 'ROLE_CONSULTA_PERFIL'
    }
  },
  {
    path: 'empleados', component: ListUsersComponent, canActivate: [AuthGuardSecurity],
    data: {
      expectedRole: 'ROLE_CONSULTA_USUARIO'
    }
  }
]

@NgModule({
  declarations: [PerfilComponent, ListUsersComponent, PerfilEmpleadoComponent],
  imports: [
    CommonModule,
    SharedModule,
    PipeModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routesUser)
  ],
  providers: [
    AuthGuardSecurity
  ]
})
export class UserModule { }
