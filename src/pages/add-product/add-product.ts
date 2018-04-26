import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase} from "angularfire2/database";
import { ProductItem } from "../../models/product-item/product-item.model";
import { Camera, CameraOptions} from "ionic-native";

import {MyProductsPage} from "../my-products/my-products";

import {ProductListService} from "../../services/product-list/product-list.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html',
})
export class AddProductPage {

  product: ProductItem = {
    name: '',
    description: '',
    price: undefined,
    image: '',
    uid: '',
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase, private list: ProductListService,
              private auth: AuthService) {
  }

  addProduct(product: ProductItem) {
    product.uid = this.auth.getUserUid();
    console.log(this.product.uid);
    this.list.addProduct(product).then(ref => {
      console.log(ref.key); //Get key and show it on console
      this.navCtrl.push(MyProductsPage, {key: ref.key});  //Goes to MyProductsPage with key
      this.navCtrl.parent.select(2);
      this.navCtrl.popToRoot();
    });
  }

  takePhoto() {
    let options: CameraOptions = {
      quality: 100,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: false
    };

    Camera.getPicture(options).then((imageData) => {
      this.product.image = `data:image/jpeg;base64,${imageData}`;
    })
  }

  uploadPhoto() {
    let options: CameraOptions = {
      quality: 100,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: false
    };

    Camera.getPicture(options).then((imageData) => {
      this.product.image = `data:image/jpeg;base64,${imageData}`;
    })
  }

}
