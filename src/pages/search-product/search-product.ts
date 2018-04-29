import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import {ChatPage} from "../chat/chat";
import {Profile} from "../../models/profile.model";
import {Observable} from "rxjs/Observable";
import {ProfileService} from "../../services/profile.service";

@Component({
  selector: 'page-search-product',
  templateUrl: 'search-product.html',
})
export class SearchProductPage {

  public productList:Array<any>;   //List of products we are pulling from db
  public loadedProductList:Array<any>;  //"Hack" for big list
  public productRef:firebase.database.Reference;

  userList$: Observable<Profile []>;


  constructor(public navCtrl: NavController, public navParams: NavParams, private pService: ProfileService,) {

    this.productRef = firebase.database().ref('/product-list');

    this.productRef.on('value', productList => {
      let products = [];
      productList.forEach( name => {
        products.reverse().push(name.val());
        return false;
      });

      this.productList = products;
      this.loadedProductList = products.reverse();
    });

    this.userList$ = this.pService
      .getProfiles()
      .snapshotChanges()
      .map(
        changes => {
          return changes.map(c => ({
            key: c.payload.key, ...c.payload.val()
          })).reverse()
        }
      );

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
          return true;
        }
        return false;
      }
    });
  }

  chat(product) {
    this.navCtrl.push(ChatPage, product);
  }

  doRefresh(refresher) {
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

}
