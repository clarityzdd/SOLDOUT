import {Injectable} from "@angular/core";
import {AngularFireDatabase} from "angularfire2/database";

import {ProductItem} from "../../models/product-item/product-item.model";

@Injectable()

export class ProductListService {

  private productListRef = this.db.list<ProductItem>
  ('product-list');

  constructor(private db: AngularFireDatabase) {

  }

  getProductList () {
    return this.productListRef;
  }

  addProduct(product: ProductItem) {
    return this.productListRef.push(product);
  }

}
