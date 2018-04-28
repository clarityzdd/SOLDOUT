import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Profile} from "../../models/profile.model";
import {AuthService} from "../../services/auth.service";
import {ProfileService} from "../../services/profile.service";
import {TabsPage} from "../tabs/tabs";

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

  profile: Profile;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private auth: AuthService, private list: ProfileService,
              ) {
    this.profile = this.navParams.get('profile');
    console.log(this.profile);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

  updateProfile(profile: Profile) {
    this.list.editProfile(profile).then(() => {
      this.navCtrl.popTo(TabsPage);
    })
  }
}
