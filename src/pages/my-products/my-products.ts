import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthService} from "../../services/auth.service";
import {LoginPage} from "../login/login";
import firebase from "firebase";
import {EditProductPage} from "../edit-product/edit-product";
import {ProductItem} from "../../models/product-item/product-item.model";
import {ProductListService} from "../../services/product-list/product-list.service";
import {ToastService} from "../../services/toast.service";
import {ChatPage} from "../chat/chat";
import {Observable} from "rxjs/Observable";
import {Profile} from "../../models/profile.model";
import {ProfileService} from "../../services/profile.service";

@IonicPage()
@Component({
  selector: 'page-my-products',
  templateUrl: 'my-products.html',
})
export class MyProductsPage {

  public productList:Array<any>;   //List of products we are pulling from db
  public productRef:firebase.database.Reference;
  userList$: Observable<Profile []>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private auth: AuthService,
              private list: ProductListService,
              private toast: ToastService,
              private pService: ProfileService,
  ) {
    this.productRef = firebase.database().ref('/product-list');
    this.productRef.on('value', productList => {
      let products = [];
      productList.forEach( name => {
        products.push(name.val());
        return false;
      });
      this.productList = products.reverse();
    });

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

  editProduct(product) {
    this.navCtrl.push(EditProductPage, product);
  }

  removeProduct(product: ProductItem) {
    this.list.removeProduct(product).then(() => {
      this.toast.show(`${product.name} ha sido eliminado`);
    });
  }

  chat(product) {
    this.navCtrl.push(ChatPage, product);
  }

  doRefresh(refresher) {
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyProductsPage');
  }

}
