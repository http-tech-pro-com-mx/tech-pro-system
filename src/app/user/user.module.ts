import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from './perfil/perfil.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListUsersComponent } from './list-users/list-users.component';

const routesUser: Routes = [
  { path: 'perfil', component: PerfilComponent },
  { path: 'empleados', component: ListUsersComponent },
]

@NgModule({
  declarations: [PerfilComponent, ListUsersComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routesUser)
  ]
})
export class UserModule { }
