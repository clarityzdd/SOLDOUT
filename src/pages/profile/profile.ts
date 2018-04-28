import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {Profile} from "../../models/profile.model";
import {AngularFireDatabase, AngularFireObject} from "angularfire2/database";
import {TabsPage} from "../tabs/tabs";
import {Observable} from "rxjs/Observable";

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  profileData: AngularFireObject<Profile>;
  profileDataObservable: Observable<Profile>;
  profile = {} as Profile;

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.afAuth.authState.take(1).subscribe(data => {
      this.profileDataObservable = this.db.object(`user-list/${data.uid}`).valueChanges();
    })
  }

  createProfile() {
    this.afAuth.authState.take(1).subscribe(auth => {
      this.db.object(`user-list/${auth.uid}`).set(this.profile).
      then(() => this.navCtrl.setRoot(TabsPage));
    });
  }

  editProfile() {

  }

}
