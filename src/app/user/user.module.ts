import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from './perfil/perfil.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListUsersComponent } from './list-users/list-users.component';
import { PipeModule } from '../pipe/pipe.module';
import { PerfilEmpleadoComponent } from './perfil-empleado/perfil-empleado.component'

const routesUser: Routes = [
  { path: 'perfil', component: PerfilComponent },
  { path: 'empleados/perfil/:username', component: PerfilEmpleadoComponent },
  { path: 'empleados', component: ListUsersComponent }
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
  ]
})
export class UserModule { }
