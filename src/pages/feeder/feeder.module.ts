import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeederPage } from './feeder';

@NgModule({
  declarations: [
    FeederPage,
  ],
  imports: [
    IonicPageModule.forChild(FeederPage),
  ],
})
export class FeederPageModule {}
