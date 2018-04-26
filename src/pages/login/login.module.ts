import { NgModule } from '@angular/core';
import {IonicPageModule, NavController} from 'ionic-angular';
import { LoginPage } from './login';
import { FormGroup, FormBuilder, Validators} from "@angular/forms";



@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
  ],
})
export class LoginPageModule {}
