import {Injectable} from "@angular/core";
import {AngularFireDatabase} from "angularfire2/database";

import {ProductItem} from "../../models/product-item/product-item.model";
import {AngularFireAuth} from "angularfire2/auth";
import {AuthService} from "../auth.service";

@Injectable()

export class ProductListService {

  private productListRef = this.db.list<ProductItem>
  ('product-list');
  userId: string;

  constructor(private db: AngularFireDatabase, private afAuth: AuthService) {
    this.userId = this.afAuth.getUserUid();
  }

  getProductList () {
    this.productListRef = this.db.list(`product-list/${this.userId}`);
    return this.productListRef;
  }

  addProduct(product: ProductItem) {
    return this.productListRef.push(product);
  }

}
