import { Component } from '@angular/core';

import { AddProductPage } from '../add-product/add-product'
import {ProductListPage} from "../product-list/product-list";
import {MyProductsPage} from "../my-products/my-products";
import {MenuController} from "ionic-angular";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = AddProductPage;
  tab2Root = ProductListPage;
  tab3Root = MyProductsPage;

  constructor(public menuCtrl: MenuController) {
    this.menuCtrl.enable(true,'sideMenu');
  }

}
