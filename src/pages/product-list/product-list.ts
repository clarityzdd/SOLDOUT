import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AddProductPage} from "../add-product/add-product";
import {SearchProductPage} from "../search-product/search-product";

import {ProductListService} from "../../services/product-list/product-list.service";
import {ProductItem} from "../../models/product-item/product-item.model";
import {Observable} from "rxjs/Observable";

import firebase from 'firebase';

@Component({
  selector: 'page-product-list',
  templateUrl: 'product-list.html',
})
export class ProductListPage {

  productList$: Observable<ProductItem []>;

  public searchProductList:Array<any>;   //List of products we are pulling from db

  public loadedProductList:Array<any>;  //"Hack" for big list

  public productRef:firebase.database.Reference;

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
      );

    this.productRef = firebase.database().ref('/product-list');

    this.productRef.on('value', searchProductList => {
      let products = [];
      searchProductList.forEach( name => {
        products.push(name.val());
        return false;
      });

      this.searchProductList = products;
      this.loadedProductList = products;
    });

  }

  navToAddProductPage() {
    this.navCtrl.push(AddProductPage);
    this.navCtrl.parent.select(0);
    this.navCtrl.popToRoot();
  }

  navSearchProductPage() {
    this.navCtrl.push(SearchProductPage);
  }

  initializaItems(): void {
    this.searchProductList = this.loadedProductList;
  }

  getItems(searchbar) {
    this.initializaItems();

    const value = searchbar.srcElement.value;

    if (!value) return;

    this.searchProductList = this.searchProductList.filter((v) => {
      if(v.name && value) {
        if (v.name.toLowerCase().indexOf(value.toLowerCase()) > -1) {
          console.log("FUNCIONA");
          return true;
        }
        return false;
      }
    });
  }

  doRefresh(refresher) {
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

}
