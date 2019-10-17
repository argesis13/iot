import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';


import {LogsRoutingModule} from './logs-routing.module';
import {LogsPage} from './logs';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogsRoutingModule
  ],
  declarations: [
    LogsPage
  ]
})
export class LogsModule {}

