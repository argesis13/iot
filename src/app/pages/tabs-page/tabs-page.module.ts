import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';

import {TabsPage} from './tabs-page';
import {TabsPageRoutingModule} from './tabs-page-routing.module';

import {MapModule} from '../map/map.module';
import {LogDetailModule} from '../log-detail/log-detail.module';
import {LogsModule} from '../logs/logs.module';
import {FamilyDetailsPageModule} from '../family-details/family-details.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MapModule,
    LogsModule,
    LogDetailModule,
    TabsPageRoutingModule,
    FamilyDetailsPageModule
  ],
  declarations: [
    TabsPage,
  ]
})
export class TabsModule { }
