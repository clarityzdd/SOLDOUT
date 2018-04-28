import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {TabsPage} from "../tabs/tabs";
import {Profile} from "../../models/profile.model";
import {ProfileService} from "../../services/profile.service";
import * as firebase from "firebase";

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  signupError: string;
  form: FormGroup;
  defaultImage = '../../assets/imgs/identicon.png';

  // Aqui va lo del profile, ya que se crean los perfiles cuando se registra el usuario.
  profile: Profile = {
    email: '',
    name: '',
    address: '',
    image: '',
  }

  constructor(private navCtrl: NavController, private auth: AuthService,
              fb: FormBuilder, private list: ProfileService) {
    this.form = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  createProfile(profile: Profile) {
    profile.email = this.form.value.email;
    profile.image = this.defaultImage;
    this.list.addProfile(profile).then(ref => {
      const newKey = ref.key;
      firebase.database().ref(`user-list/${newKey}/key}`).set(newKey);
    });
    //console.log(profile);
  }

  // Añadir createProfile a la parte que se cumple de la promesa
  signup() {
    let data = this.form.value;
    let credentials = {
      email: data.email,
      password: data.password
    };
    this.auth.signUp(credentials).then(
      () => {this.navCtrl.setRoot(TabsPage);
                       },
      error => this.signupError = error.message
    );
  }
}
