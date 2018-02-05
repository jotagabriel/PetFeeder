import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../model/user/user';

@Injectable()
export class AuthProvider {

  user: Observable<firebase.User>;

  constructor(
    private angularFireAuth: AngularFireAuth) {
    this.user = angularFireAuth.authState;
  }

  createUser(user: User) {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(user.mail, user.password);
  }

  signIn(user: User){
    return this.angularFireAuth.auth.signInWithEmailAndPassword(user.mail, user.password);
  }

  recoverPass(mail: string) {
    return this.angularFireAuth.auth.sendPasswordResetEmail(mail);
  }

  signInWithFacebook() {
    return false;
  }

  signInWithGoogle() {
    return false;
  }

}