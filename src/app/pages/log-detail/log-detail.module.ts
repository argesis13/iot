import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {LogDetailPage} from './log-detail';
import {LogDetailRoutingModule} from './log-detail-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogDetailRoutingModule
  ],
  declarations: [LogDetailPage]
})
export class LogDetailModule {}

