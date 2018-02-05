import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, MenuController, LoadingController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { CreateAccountPage } from '../create-account/create-account';
import { HomePage } from '../home/home';
import { AuthProvider } from '../../providers/auth/auth';
import { User } from '../../model/user/user';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

  user : User = new User();
  @ViewChild('form') form: NgForm;

  userMail : string = '';
  /* Habilita o campo de email para login com email */
  showLogWithMailMail : boolean = false;
  /* Habilida o campo de senha para login com email */
  showLogWhithMailPass : boolean = false;
  /* Habilita os campos de login com Midias */
  showLogWithSocial : boolean = true;
  /* Habilita os campos de recuperação de senha */
  showRecoverPass : boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public menu: MenuController,
    public authService: AuthProvider,
    public loadingCtrl: LoadingController) {
      /* Desabilita o acesso ao menu */
      this.menuCtl(false);
  }

  createAccount() {
    this.navCtrl.push(CreateAccountPage, {val: 'val'})
  }

  showLoginWithMail() {
    if (this.showLogWithSocial == true) {
      this.showLogWithSocial = false;
      this.showLogWithMailMail = true;
      this.showLogWhithMailPass = true;
      this.showRecoverPass = false;
    } else {
      this.showLogWithSocial = true;
      this.showLogWithMailMail = false;
      this.showLogWhithMailPass = false;
      this.showRecoverPass = false;
    }
  }

  loginWithMail(){
    let loader = this.loadingCtrl.create({content: 'Aguarde'});
    loader.present()
    .then(() => {
      if(this.form.form.valid){
        //this.loading("Aguarde...");
        this.authService.signIn(this.user)
          .then(() => {
            this.navCtrl.setRoot(HomePage, {val: 'val'}) 
          })
          .catch((error: any) => {
            if(error.code == 'auth/invalid-email') {
              this.toast("E-mail invalido!");
            } else if(error.code == 'auth/user-disabled') {
              this.toast("Usuario desativado!");
            } else if(error.code == 'auth/user-not-found') {
              this.toast("Usuario incorreto!");
            } else if(error.code == 'auth/wrong-password') {
              this.toast("Senha incorreta!");
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

  loginWithFace() {
    this.toast("Login com Facebook indisponivel!");
  }

  loginWithGoogle() {
    this.toast("Login com Google indisponivel!");
  }
  
  toast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  menuCtl(status: boolean) {
    this.menu.enable(status, 'left');
  }

  showRecPass() {
    this.showRecoverPass = true;
    this.showLogWhithMailPass = false;
  }

  recoverPass() {
    this.authService.recoverPass(this.userMail)
    .then(() => {
      this.toast("Recuperação de senha solicitada com sucesso!");
      /* Habilita o campo de email para login com email */
      this.showLogWithMailMail = false;
      /* Habilida o campo de senha para login com email */
      this.showLogWhithMailPass = false;
      /* Habilita os campos de login com Midias */
      this.showLogWithSocial = true;
      /* Habilita os campos de recuperação de senha */
      this.showRecoverPass = false;
    })
    .catch((error: any) => {
      if (error.code == 'auth/invalid-email') {
        this.toast("E-mail invalido! "+ this.userMail);
      } else if (error.code == 'auth/user-not-found') {
        this.toast("Usuario não econtrado! "+ this.userMail);
      }
    });
  }

}
