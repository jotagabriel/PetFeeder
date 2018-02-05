import { Injectable } from '@angular/core';
import 'rxjs/operator/map'
import { AngularFireDatabase } from 'angularfire2/database';
import { DataSnapshot } from '@firebase/database/dist/esm/src/api/DataSnapshot';

@Injectable()
export class LampProvider {

  public aux: any;

  constructor(
    public db: AngularFireDatabase) {
  }

  getStatus(){
    return this.db.list('/lampada').snapshotChanges().map(changes => {
      return changes.map(lamp => ({...lamp.payload.val()}))
    })
  }

  setStatus(value: any) {
    return new Promise((resolve, reject) => {
      this.db.list('/lampada').set('status', value).then(() => resolve());
    })
  }

  AUX_setStatus(value: any) {
    return new Promise((resolve, reject) => {
      this.db.list('/').set('lampada', value).then(() => resolve());
    })
  }

}