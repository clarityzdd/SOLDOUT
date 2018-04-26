import {Injectable} from "@angular/core";
import {AngularFireDatabase} from "angularfire2/database";

import {ProductItem} from "../../models/product-item/product-item.model";
import {AuthService} from "../auth.service";


@Injectable()

export class ProductListService {

  private productListRef = this.db.list<ProductItem>
  ('product-list');

  constructor(private db: AngularFireDatabase, private auth: AuthService) {
  }

  getProductList () {
    if (!this.auth.user.uid) return;
    console.log('UID: ' + this.auth.user.uid + '; Email: ' + this.auth.getEmail() );
    this.productListRef = this.db.list(`product-list/`);
    return this.productListRef;
  }

  addProduct(product: ProductItem) {
    return this.productListRef.push(product);
  }

  editProduct(product: ProductItem) {
    return this.productListRef.update(product.key, product);
  }

}
