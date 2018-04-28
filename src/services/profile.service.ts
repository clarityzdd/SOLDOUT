import {Injectable} from "@angular/core";
import * as firebase from 'firebase/app';
import {AuthService} from "./auth.service";
import {AngularFireDatabase} from "angularfire2/database";
import {AngularFireAuth} from "angularfire2/auth";
import {Profile} from "../models/profile.model";


@Injectable()
export class ProfileService {
  userListRef = this.db.list<Profile>('user-list'); //Se puede cambiar a profiles.

  constructor(private afauth: AngularFireAuth, private db: AngularFireDatabase,
              private auth: AuthService,
              ) {
  }

  getProfileList() {
    if (!this.auth.user.uid) return;
    this.userListRef = this.db.list('user-list/');
    return this.userListRef;
  }

  addProfile(profile: Profile) {
    return this.userListRef.push(profile)
  }

  editProfile(profile: Profile) {
    return this.userListRef.update(profile.key, profile);
  }

  getCurrentProfile() {
    //const data = this.userListRef.valueChanges().subscribe(res => console.log(res));
    const data =  this.db.list('user-list/', query => query.orderByChild('email')
      .equalTo(this.auth.getEmail())).valueChanges().subscribe(res => {
        var profile : Profile;
        profile = {
          email: res[0]['email'],
          address: res[0]['address'],
          name: res[0]['name'],
          image: res[0]['image'],
          key: res[0]['key'],
        }
        return profile;
    });
  }

  getProfile(email: string
  ) {
    this.db.list('user-list/', query => query.orderByChild('email')
      .equalTo(email)).valueChanges().subscribe(res => {
      var profile : Profile;
      profile = {
        email: res[0]['email'],
        address: res[0]['address'],
        name: res[0]['name'],
        image: res[0]['image'],
      };
      console.log(profile.image);
      console.log(profile.name);
      console.log(profile.address);
      console.log(profile.email);
      console.log('Dentro del servicio: ',  profile);
      return profile;
    });

  }
}
