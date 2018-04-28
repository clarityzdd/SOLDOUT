import {Injectable} from "@angular/core";
import * as firebase from 'firebase/app';
import {AuthService} from "./auth.service";
import {AngularFireDatabase} from "angularfire2/database";
import {AngularFireAuth} from "angularfire2/auth";
import {Profile} from "../models/profile.model";


@Injectable()
export class ProfileService {
  private userListRef = this.db.list<Profile>('user-list'); //Se puede cambiar a profiles.

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
}
