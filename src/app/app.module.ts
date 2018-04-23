import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import {ProductListPage} from "../pages/product-list/product-list";
import {AddProductPage} from "../pages/add-product/add-product";
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";

import { FIREBASE_CONFIG } from "./firebase.credentials";
import {MyProductsPage} from "../pages/my-products/my-products";
import {ProductListService} from "../services/product-list/product-list.service";



@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    AddProductPage,
    ProductListPage,
    MyProductsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    AddProductPage,
    ProductListPage,
    MyProductsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProductListService
  ]
})
export class AppModule {}
