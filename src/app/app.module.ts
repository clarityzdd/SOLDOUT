import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { NgxErrorsModule } from '@ultimate/ngxerrors';

import {ProductListPage} from "../pages/product-list/product-list";
import {AddProductPage} from "../pages/add-product/add-product";
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import {MyProductsPage} from "../pages/my-products/my-products";
import { SignupPage} from "../pages/signup/signup";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireDatabaseModule } from "angularfire2/database";
import {AngularFireAuth, AngularFireAuthModule} from "angularfire2/auth"
import { AngularFireModule } from "angularfire2";


import {ProductListService} from "../services/product-list/product-list.service";
import { AuthService} from "../services/auth.service";
import { FIREBASE_CONFIG } from "../config/firebase.credentials";
import {SearchProductPage} from "../pages/search-product/search-product";



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
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProductListService,
    AuthService,
    AngularFireAuth
  ]
})
export class AppModule {}
