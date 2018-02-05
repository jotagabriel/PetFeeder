import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { CreateAccountPage } from '../pages/create-account/create-account';
import { ProfilePage } from '../pages/profile/profile';
import { SettingsPage } from '../pages/settings/settings';
import { NotificationsPage } from '../pages/notifications/notifications';
import { PetsPage } from '../pages/pets/pets';
import { FeederPage } from '../pages/feeder/feeder';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
import { LampProvider } from '../providers/lamp/lamp';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule} from 'angularfire2/database';

const firebaseConfig = {
  apiKey: "AIzaSyDd_n0H4NWDt5pBoVwkaogxFyPcM5Zhmj4",
  authDomain: "petfeeder-55696.firebaseapp.com",
  databaseURL: "https://petfeeder-55696.firebaseio.com",
  projectId: "petfeeder-55696",
  storageBucket: "petfeeder-55696.appspot.com",
  messagingSenderId: "42727312620"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    CreateAccountPage,
    ProfilePage,
    SettingsPage,
    NotificationsPage,
    PetsPage,
    FeederPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    HomePage,
    LoginPage,
    CreateAccountPage,
    ProfilePage,
    SettingsPage,
    NotificationsPage,
    PetsPage,
    FeederPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    LampProvider
  ]
})
export class AppModule {}
