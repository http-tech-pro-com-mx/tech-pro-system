import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import localeEsMx from '@angular/common/locales/es-MX';
import { registerLocaleData } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';


import { AppComponent } from './app.component';
import { LoaderComponent } from './loader/loader.component';
import { LoginComponent } from './login/login.component';
import { NotFound404Component } from './not-found404/not-found404.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './auth/auth.service';
import { NotAuthGuard } from './auth/not.auth.guard';
import { AuthGuard } from './auth/auth.guard';
import { TokenInterceptor } from './auth/token.interceptor';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

registerLocaleData(localeEsMx);

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [NotAuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [NotAuthGuard] },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard] , children: [
      { path: 'attendance', loadChildren: './attendance/attendance.module#AttendanceModule' },
      { path: 'user', loadChildren: './user/user.module#UserModule' }
    ]
  },
  { path: '**', component: NotFound404Component }];


@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    LoginComponent,
    NotFound404Component,
    HomeComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
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
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: LOCALE_ID, useValue: 'es-MX' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
