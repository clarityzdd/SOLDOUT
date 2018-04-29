import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import {Profile} from "../../models/profile.model";
import {ProfileService} from "../../services/profile.service";

/**
 * Generated class for the CreateProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-profile',
  templateUrl: 'create-profile.html',
})
export class CreateProfilePage {

  profile = {} as Profile;

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams,
    private pService: ProfileService) {
    this.profile.email = this.afAuth.auth.currentUser.email;
    this.profile.uid = this.afAuth.auth.currentUser.uid;
    this.profile.image = `https://avatars.dicebear.com/v2/identicon/${this.profile.uid}.svg`;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateProfilePage');
  }

  createProfile() {
    this.afAuth.authState.take(1).subscribe(auth => {
      this.db.object(`user-list/${auth.uid}`).set(this.profile).
      then(() => this.navCtrl.setRoot(TabsPage));
    });
  }
}
