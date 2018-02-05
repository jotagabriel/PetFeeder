import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { SettingsPage } from '../pages/settings/settings';
import { NotificationsPage } from '../pages/notifications/notifications';
import { PetsPage } from '../pages/pets/pets';
import { FeederPage } from '../pages/feeder/feeder';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen) {
    this.initializeApp();
    this.pages = [
      { title: 'Início', component: HomePage, icon: 'ios-home-outline' },
      { title: 'Feeder', component: FeederPage, icon: 'ios-cube-outline' },
      { title: 'Pets', component: PetsPage, icon: 'ios-paw-outline' },
      { title: 'Notificações', component: NotificationsPage, icon: 'ios-notifications-outline' },
      { title: 'Configurações', component: SettingsPage, icon: 'ios-settings-outline' }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  openProfile(){
    this.nav.setRoot(ProfilePage);
  }

}
