import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthService} from "../../services/auth.service";
import {LoginPage} from "../login/login";
import firebase from "firebase";
import {EditProductPage} from "../edit-product/edit-product";

@IonicPage()
@Component({
  selector: 'page-my-products',
  templateUrl: 'my-products.html',
})
export class MyProductsPage {

  public productList:Array<any>;   //List of products we are pulling from db

  public productRef:firebase.database.Reference;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private auth: AuthService) {

    this.productRef = firebase.database().ref('/product-list');

    this.productRef.on('value', productList => {
      let products = [];
      productList.forEach( name => {
        products.push(name.val());
        return false;
      });

      this.productList = products.reverse();

    });

  }

  editProduct(product) {
    this.navCtrl.push(EditProductPage, product);
  }

  doRefresh(refresher) {
    setTimeout(() => {
      refresher.complete();
    }, 2000);
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
