import { Component } from '@angular/core';
import { NavController, MenuController, ToastController } from 'ionic-angular';
import { LampProvider } from '../../providers/lamp/lamp';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  status: boolean;
  lampDB: Observable<any>;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public lamp: LampProvider,
    public toastCtrl: ToastController) {
    this.menu(true);
    this.status = true;
  
    this.lampDB = this.lamp.getStatus();
    /*
    if (this.lampDB == null) {
      this.status = true;
    } else if (this.lampDB == null) {
      this.status = false;
    } else {
      this.status = null;
    }
    */ 
  }

  menu(status: boolean) {
    this.menuCtrl.enable(status, 'left');
  }

  toggle(){
    this.status = !this.status;
    if (this.status == true) {
      this.lamp.setStatus('On');
    } else {
      this.lamp.setStatus('Off');
    }
  }

  toast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

}
