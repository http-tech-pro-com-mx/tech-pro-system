import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoaderComponent } from './loader/loader.component';
import { LoginComponent } from './login/login.component';
import { NotFound404Component } from './not-found404/not-found404.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './auth/auth.service';
import { NotAuthGuard } from './auth/not.auth.guard';
import { AuthGuard } from './auth/auth.guard';
import { TokenInterceptor } from './auth/token.interceptor';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [NotAuthGuard] },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard] , children: [
      { path: 'attendance', loadChildren: './attendance/attendance.module#AttendanceModule' },
    ]
  },
  { path: '**', component: NotFound404Component }];


@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    LoginComponent,
    NotFound404Component,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
    NotAuthGuard,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
