import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from './perfil/perfil.component';
import { SharedModule } from '../shared/shared.module';

const routesUser: Routes = [
  { path: 'perfil', component: PerfilComponent }
]

@NgModule({
  declarations: [PerfilComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routesUser)
  ]
})
export class UserModule { }
