import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LogDetailPage } from './log-detail';

const routes: Routes = [
  {
    path: '',
    component: LogDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogDetailRoutingModule { }
