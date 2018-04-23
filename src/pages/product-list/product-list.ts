import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AddProductPage} from "../add-product/add-product";

@Component({
  selector: 'page-product-list',
  templateUrl: 'product-list.html',
})
export class ProductListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  navToAddProductPage() {
    this.navCtrl.push(AddProductPage);
    this.navCtrl.parent.select(0);
    this.navCtrl.popToRoot();
  }
}
