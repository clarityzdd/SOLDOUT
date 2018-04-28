import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {ProfileService} from "../services/profile.service";
import { LoginPage } from '../pages/login/login';

import { AuthService} from "../services/auth.service";
import {Profile} from "../models/profile.model";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
  @ViewChild(Nav) nav: Nav;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private auth: AuthService, private pService: ProfileService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  getCurrentProfile() {
    return this.pService.getCurrentProfile();
  }

  getProfile(email: string) {
    var profile = this.pService.getProfile(email);
    console.log('Dentro de app.component: ' + profile);
    return profile;
  }

  editProfile(profile: Profile) {
    return this.pService.editProfile(profile);
  }

  logout() {
    this.auth.signOut().then(
      function() {
        console.log('Logout');
      }
      ,function (error) {
        console.error('error: ' + error);
      });
    this.nav.setRoot(LoginPage);
  }
}
