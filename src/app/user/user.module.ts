import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from './perfil/perfil.component';

const routesUser: Routes = [
  { path: 'perfil', component: PerfilComponent }
]

@NgModule({
  declarations: [PerfilComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routesUser)
  ]
})
export class UserModule { }
