import {Component, ViewChild} from '@angular/core';
import {IonicPage, MenuController, Nav, NavController, NavParams} from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {AuthService} from "../../services/auth.service";
import {ProfileService} from "../../services/profile.service";
import {LoginPage} from "../login/login";
import {ProfilePage} from "../profile/profile";


@IonicPage()
@Component({
  selector: 'page-side-menu',
  templateUrl: 'side-menu.html',
})
export class SideMenuPage {

  rootPage = TabsPage;
  @ViewChild(Nav) nav : Nav;


  constructor(public navCtrl: NavController, public navParams: NavParams,
              private auth: AuthService, private pService: ProfileService,
              private menu: MenuController) {
    this.menu.enable(true, 'sideMenu');


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SideMenuPage');
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
