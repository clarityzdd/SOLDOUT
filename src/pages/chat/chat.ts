import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import {ProductItem} from "../../models/product-item/product-item.model";
import {AuthService} from "../../services/auth.service";



@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  user: string = '';
  message: string = '';
  _chatSubscription;
  messages: object[] = [];

  product: ProductItem;
  productKey: string = '';

  constructor(public db: AngularFireDatabase,
              public navCtrl: NavController,
              public navParams: NavParams,
              private auth: AuthService,
  ) {
    this.product = this.navParams.get('product');
    this.productKey = this.product.key;

    this.user = this.auth.getUserUid();
    this._chatSubscription = this.db.list(`/chat/${this.productKey}`).valueChanges().subscribe( data => {
      this.messages = data;
    });
  }

  sendMessage() {
    this.db.list(`/chat/${this.productKey}`).push({
      user: this.user,
      message: this.message
    }).then( () => {
      // message is sent
      console.log('mensaje enviado')
    });
    this.message = '';
  }

  ionViewDidLoad() {
    this.db.list(`/chat/${this.productKey}`).push({
    });
  }

  ionViewWillLeave(){
    this._chatSubscription.unsubscribe();
    this.db.list(`/chat/${this.productKey}`).push({
    });
  }
}
