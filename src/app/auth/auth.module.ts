import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './pages/register/register.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { UserDetailsPageComponent } from './pages/user-details-page/user-details-page.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    RegisterComponent,
    RegisterFormComponent,
    LoginFormComponent,
    LoginComponent,
    HomeComponent,
    UserDetailsComponent,
    UserDetailsPageComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModule
  ]
})
export class AuthModule { }
