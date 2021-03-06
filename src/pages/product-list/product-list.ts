import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AddProductPage} from "../add-product/add-product";
import {SearchProductPage} from "../search-product/search-product";

import {ProductListService} from "../../services/product-list/product-list.service";
import {ProductItem} from "../../models/product-item/product-item.model";
import {Observable} from "rxjs/Observable";
import {AuthService} from "../../services/auth.service";

import firebase from 'firebase';
import {ChatPage} from "../chat/chat";
import {ProfileService} from "../../services/profile.service";
import {Profile} from "../../models/profile.model";

@Component({
  selector: 'page-product-list',
  templateUrl: 'product-list.html',
})
export class ProductListPage {

  productList$: Observable<ProductItem []>;
  userList$: Observable<Profile []>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private list: ProductListService,
              private auth: AuthService, private pService: ProfileService) {

    this.productList$ = this.list
      .getProductList()    // Return DB list
      .snapshotChanges()   // Obtain values and key - valueChanges() for only values
      .map(
        changes => {
          return changes.map(c => ({    //Return new object for every change
            key: c.payload.key, ...c.payload.val()
          })).reverse()
        }
      );

    this.userList$ = this.pService
      .getProfiles()
      .snapshotChanges()
      .map(
        changes => {
          return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
          })).reverse()
        }
      );

  }


  navToAddProductPage() {
    this.navCtrl.push(AddProductPage);
    this.navCtrl.parent.select(0);
    this.navCtrl.popToRoot();
  }

  navSearchProductPage() {
    this.navCtrl.push(SearchProductPage);
  }

  chat(product) {
    this.navCtrl.push(ChatPage, product);
  }

  doRefresh(refresher) {
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

}
