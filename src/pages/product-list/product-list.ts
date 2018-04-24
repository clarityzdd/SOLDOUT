import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AddProductPage} from "../add-product/add-product";

import {ProductListService} from "../../services/product-list/product-list.service";
import {ProductItem} from "../../models/product-item/product-item.model";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'page-product-list',
  templateUrl: 'product-list.html',
})
export class ProductListPage {

  productList$: Observable<ProductItem []>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private list: ProductListService) {

    this.productList$ = this.list
      .getProductList()    // Return DB list
      .snapshotChanges()   // Obtain values and key - valueChanges() for only values
      .map(
        changes => {
          return changes.map(c => ({    //Return new object for every change
            key: c.payload.key,
            ...c.payload.val()
          })).reverse()
        }
      )

  }

  navToAddProductPage() {
    this.navCtrl.push(AddProductPage);
    this.navCtrl.parent.select(0);
    this.navCtrl.popToRoot();
  }

  doRefresh(refresher) {

    setTimeout(() => {
      refresher.complete();
    }, 2000);

  }

}
