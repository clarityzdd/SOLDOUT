import { Component } from '@angular/core';
import {IonicPage, MenuController, NavController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import { SignupPage } from "../signup/signup";
import {SideMenuPage} from "../side-menu/side-menu";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

   loginForm: FormGroup;
   loginError: string;

  constructor(private navCtrl: NavController, private auth: AuthService,
              fb: FormBuilder, public menu: MenuController) {
    this.loginForm = fb.group({
      email: ['',Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])]
    });
    this.menu.enable(false, 'sideMenu');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    let data = this.loginForm.value;

    if (!data.email){ return;}

    let credentials = {
      email: data.email,
      password: data.password
    }

    this.auth.signInWithEmail(credentials).then(
      () => this.navCtrl.setRoot(SideMenuPage),
      error => this.loginError = error.message
    )
  }

  signup() {
    this.navCtrl.push(SignupPage);
  }
}
