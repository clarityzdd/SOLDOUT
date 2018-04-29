import {AngularFireDatabase, AngularFireList, AngularFireObject} from "angularfire2/database";
import {ProductItem} from "../models/product-item/product-item.model";
import {AuthService} from "./auth.service";
import {Injectable} from "@angular/core";
import {Profile} from "../models/profile.model";
import {Observable} from "rxjs/Observable";

@Injectable()

export class ProfileService {

  currentUserProfile: AngularFireObject<Profile>;
  profileList: AngularFireList<Profile>;
  currentUserProfileImage;
  constructor(private db: AngularFireDatabase, private auth: AuthService) {
    this.profileList = db.list(`user-list/`);
    this.currentUserProfile = db.object(`user-list/${this.auth.afAuth.auth.currentUser.uid}`);
  }

  getProfiles() {
    return this.profileList;
  }

  getProfile(uid: string) {
    return this.db.object(`user-list/${uid}`);
  }

  getCurrentUserProfile() {
    return this.currentUserProfile;
  }

  getCurrentProfileImage() {

    this.currentUserProfile.valueChanges().subscribe(data => {
      this.currentUserProfileImage = data.image;
    });
    console.log(this.currentUserProfileImage);
    return this.currentUserProfileImage;
  }

  getProfileName() {

  }

}
