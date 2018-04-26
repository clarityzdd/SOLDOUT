import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthService} from "../../services/auth.service";
import {LoginPage} from "../login/login";
import {TabsPage} from "../tabs/tabs";

/**
 * Generated class for the MyProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-products',
  templateUrl: 'my-products.html',
})
export class MyProductsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private auth: AuthService) {
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
