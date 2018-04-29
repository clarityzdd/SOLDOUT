import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase} from "angularfire2/database";
import {AngularFireAuth} from "angularfire2/auth";
import {Profile} from "../../models/profile.model";
import {ProfilePage} from "../profile/profile";
import {Observable} from "rxjs/Observable";

/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  profile = {} as Profile;
  profileDataObservable: Observable<Profile>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private afAuth: AngularFireAuth, private db: AngularFireDatabase,
              ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
    this.afAuth.authState.take(1).subscribe(data => {
      this.profileDataObservable = this.db.object(`user-list/${data.uid}`).valueChanges();
    })
  }

  saveProfile(profile: Profile) {
    this.editProfile(profile);
  }

  editProfile(profile: Profile) {
    this.afAuth.authState.take(1).subscribe(auth => {
      this.db.object(`user-list/${auth.uid}`).set(profile).then(() => {
        this.navCtrl.setRoot(ProfilePage);
      })
    })
  }
}
