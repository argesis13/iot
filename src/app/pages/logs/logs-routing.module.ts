import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {LogsPage} from './logs';

const routes: Routes = [
  {
    path: '',
    component: LogsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogsRoutingModule { }
