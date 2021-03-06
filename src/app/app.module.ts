import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { NgxErrorsModule } from '@ultimate/ngxerrors';

import { ProductListPage } from "../pages/product-list/product-list";
import { AddProductPage } from "../pages/add-product/add-product";
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { MyProductsPage } from "../pages/my-products/my-products";
import { SignupPage} from "../pages/signup/signup";
import { SearchProductPage} from "../pages/search-product/search-product";
import { EditProductPage } from "../pages/edit-product/edit-product";
import {ChatPage} from "../pages/chat/chat";
import {CreateProfilePage} from "../pages/create-profile/create-profile";
import {ProfilePage} from "../pages/profile/profile";
import {EditProfilePage} from "../pages/edit-profile/edit-profile";
import {SideMenuPage} from "../pages/side-menu/side-menu";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuth, AngularFireAuthModule } from "angularfire2/auth"
import { AngularFireModule } from "angularfire2";

import {ProductListService} from "../services/product-list/product-list.service";
import { AuthService} from "../services/auth.service";
import {ToastService} from "../services/toast.service";
import { FIREBASE_CONFIG } from "../config/firebase.credentials";
import {ProfileService} from "../services/profile.service";




@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    AddProductPage,
    ProductListPage,
    MyProductsPage,
    LoginPage,
    SignupPage,
    SearchProductPage,
    EditProductPage,
    ChatPage,
    CreateProfilePage,
    ProfilePage,
    EditProfilePage,
    SideMenuPage,

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgxErrorsModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    AddProductPage,
    ProductListPage,
    MyProductsPage,
    LoginPage,
    SignupPage,
    SearchProductPage,
    EditProductPage,
    ChatPage,
    CreateProfilePage,
    ProfilePage,
    EditProfilePage,
    SideMenuPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProductListService,
    AuthService,
    AngularFireAuth,
    ToastService,
    ProfileService,
  ]
})
export class AppModule {}
