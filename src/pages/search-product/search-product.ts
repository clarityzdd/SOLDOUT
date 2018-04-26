import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';

@Component({
  selector: 'page-search-product',
  templateUrl: 'search-product.html',
})
export class SearchProductPage {

  public productList:Array<any>;   //List of products we are pulling from db

  public loadedProductList:Array<any>;  //"Hack" for big list

  public productRef:firebase.database.Reference;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.productRef = firebase.database().ref('/product-list');

    this.productRef.on('value', productList => {
      let products = [];
      productList.forEach( name => {
        products.reverse().push(name.val());
        return false;
      });

      this.productList = products;
      this.loadedProductList = products;
    });

  }

  initializaItems(): void {
    this.productList = this.loadedProductList;
  }

  getItems(searchbar) {
    this.initializaItems();

    const value = searchbar.srcElement.value;

    if (!value) return;

    this.productList = this.productList.filter((v) => {
      if(v.name && value) {
        if (v.name.toLowerCase().indexOf(value.toLowerCase()) > -1) {
          console.log("FUNCIONA");
          return true;
        }
        return false;
      }
    });
  }


}
