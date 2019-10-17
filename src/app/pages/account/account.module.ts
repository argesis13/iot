import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { AccountPage } from './account';
import { AccountPageRoutingModule } from './account-routing.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    AccountPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    AccountPage,
  ]
})
export class AccountModule { }
