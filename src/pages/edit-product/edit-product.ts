import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProductItem} from "../../models/product-item/product-item.model";
import {MyProductsPage} from "../my-products/my-products";
import {AuthService} from "../../services/auth.service";
import {ProductListService} from "../../services/product-list/product-list.service";
import {ToastService} from "../../services/toast.service";

@IonicPage()
@Component({
  selector: 'page-edit-product',
  templateUrl: 'edit-product.html',
})
export class EditProductPage {

  product: ProductItem;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private auth: AuthService, private list: ProductListService, private toast: ToastService) {
    this.product = this.navParams.get('product');
    console.log(this.product);
  }

  saveProduct(product: ProductItem) {
    this.list.editProduct(product).then(() => {
      this.toast.show(`${product.name} ha sido guardado!`);
      this.navCtrl.popTo(MyProductsPage);
    })
  }

}
