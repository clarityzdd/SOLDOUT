import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase} from "angularfire2/database";
import {ProductItem} from "../../models/product-item/product-item.model";

import {MyProductsPage} from "../my-products/my-products";


import {ProductListService} from "../../services/product-list/product-list.service";

@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html',
})
export class AddProductPage {

  product: ProductItem = {
    name: '',
    description: '',
    price: undefined,
  };


  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase, private list: ProductListService) {
  }

  addProduct(product: ProductItem) {
    this.list.addProduct(product).then(ref => {
      console.log(ref.key); //Get key and show it on console
      this.navCtrl.setRoot(MyProductsPage, {key: ref.key})  //Goes to MyProductsPage with key
      this.navCtrl.parent.select(2);
      this.navCtrl.popToRoot();
    })
  }

}
