import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import {ProfilePage} from "../pages/profile/profile";

import { AuthService} from "../services/auth.service";
import {ProfileService} from "../services/profile.service";


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

  profile() {
    this.nav.setRoot(ProfilePage);
  }

  getUserId() {
    return this.auth.getUserUid();
  }

  getCurrentUserProfileImage() {
    return this.pService.getCurrentProfileImage();
  }
  /*
  getUserName() {
    return this.pService.getProfileName();
  }
  */
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
