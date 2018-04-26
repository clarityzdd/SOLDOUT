import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthService} from "../../services/auth.service";
import {LoginPage} from "../login/login";

@Component({
  selector: 'page-my-products',
  templateUrl: 'my-products.html',
})
export class MyProductsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private auth: AuthService) {
  }

  doRefresh(refresher) {
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyProductsPage');
  }

  logout() {
    this.auth.signOut().then(
      function() {
        console.log('Logout');

      }
      ,function (error) {
          console.error('error: ' + error);
        });
    this.navCtrl.setRoot(LoginPage);
  }
}
