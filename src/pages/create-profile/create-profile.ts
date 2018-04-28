import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase, AngularFireObject} from "angularfire2/database";
import {Profile} from "../../models/profile.model";

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

  profileData: AngularFireObject<Profile>;
  profile = {} as Profile;

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams) {
    this.profile.email = this.afAuth.auth.currentUser.email;
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
