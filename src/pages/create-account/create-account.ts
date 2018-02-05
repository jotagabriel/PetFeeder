import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, MenuController, LoadingController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { User } from '../../model/user/user';
import { HomePage } from '../home/home';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-create-account',
  templateUrl: 'create-account.html',
})
export class CreateAccountPage {

  user: User = new User();
  @ViewChild('form') form: NgForm;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public menu: MenuController,
    public authService: AuthProvider,
    public loadingCtrl: LoadingController) {
      this.menuCtl(false);
  }

  toast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  createWithFace() {
    this.toast("Criar com Facebook indisponivel!");
  }

  createWithGoogle() {
    this.toast("Criar com Google indisponivel!");
  }

  createWithMail() {
    let loader = this.loadingCtrl.create({content: 'Aguarde'});
    loader.present()
    .then(() => {
      if(this.form.form.valid){
        this.authService.createUser(this.user)
          .then((usuario: any) => {
            this.toast("Voce foi cadastrado com sucesso!");
            this.navCtrl.setRoot(HomePage, {val: 'val'})
          })
          .catch((error: any) => {
            if (error.code == 'auth/email-already-in-use') {
              this.toast("E-mail já em uso!");
            } else if (error.code == 'auth/invalid-email') {
              this.toast("E-mail invalido!");
            } else if (error.code == 'auth/operation-not-allowed') {
              this.toast("Operação não autoriazda!");
            } else if (error.code == 'auth/weak-password') {
              this.toast("Senha muito fraca!");
            }
          });
      } else {
        this.toast("Campos obrigatórios estão vazios!");
      }
    })
    .catch(() => {
      this.toast("erro inesperado!");
    })
    loader.dismiss();    
  }

  menuCtl(status: boolean) {
    this.menu.enable(status, 'left');
  }

}
