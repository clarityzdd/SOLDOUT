import {AngularFireDatabase, AngularFireList, AngularFireObject} from "angularfire2/database";
import {ProductItem} from "../models/product-item/product-item.model";
import {AuthService} from "./auth.service";
import {Injectable} from "@angular/core";
import {Profile} from "../models/profile.model";
import {Observable} from "rxjs/Observable";

@Injectable()

export class ProfileService {

  currentUserProfile;
  profileList: AngularFireList<Profile>;
  currentUserProfileImage;
  userProfile;
  constructor(private db: AngularFireDatabase, private auth: AuthService) {
    this.profileList = db.list(`user-list/`);
    this.currentUserProfile = db.object(`user-list/${this.auth.afAuth.auth.currentUser.uid}`).valueChanges();
  }


  getProfiles() {
    return this.profileList;
  }

  getProfile(uid: string) {
    return this.db.object(`user-list/${uid}`).valueChanges();
  }

  getCurrentUserProfile() {
    return this.currentUserProfile;
  }

  getUserProfile(uid: string) {
    this.db.object(`user-list/${uid}`).valueChanges().subscribe(data => {
        console.log("DATA: ");
        console.log(data);
        this.userProfile = data;
      }
    );
    return this.userProfile;
  }

  getCurrentProfileImage() {
    this.currentUserProfile.subscribe(data => {
      this.currentUserProfileImage = data.image;
    });
    return this.currentUserProfileImage;
  }

}
