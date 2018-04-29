import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {CreateProfilePage} from "../create-profile/create-profile";

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  signupError: string;
  form: FormGroup;

  constructor(private navCtrl: NavController, private auth: AuthService,
              fb: FormBuilder) {
    this.form = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signup() {
    let data = this.form.value;
    let credentials = {
      email: data.email,
      password: data.password
    };
    this.auth.signUp(credentials).then(
      () => this.navCtrl.setRoot(CreateProfilePage),
      error => this.signupError = error.message
    );
  }
}
