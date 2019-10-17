import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs-page';
import { LogsPage} from '../logs/logs';


const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'logs',
        children: [
          {
            path: '',
            component: LogsPage,
          },
          {
            path: 'log-detail/:logId',
            loadChildren: () => import('../log-detail/log-detail.module').then(m => m.LogDetailModule)
          }
        ]
      },
      {
        path: 'map',
        children: [
          {
            path: '',
            loadChildren: () => import('../map/map.module').then(m => m.MapModule)
          }
        ]
      },
      {
        path: 'video-player',
        children: [
          {
            path: '',
            loadChildren: () => import('../video-player/video-player.module').then(m => m.VideoPlayerPageModule)
          }
        ]
      },
      {
        path: 'nfc',
        children: [
          {
            path: '',
            loadChildren: () => import('../nfc/nfc.module').then(m => m.NfcPageModule)
          }
        ]
      },
      {
        path: 'dashboard',
        children: [
          {
            path: '',
            loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardPageModule)
          }
        ]
      },
      {
        path: 'family-details',
        children: [
          {
            path: 'members',
            loadChildren: () => import('../family-details/family-details.module').then(m => m.FamilyDetailsPageModule)
          },
          {
            path: 'add-member',
            loadChildren: () => import('../family-details/add-member/add-member.module').then(m => m.AddMemberPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/app/tabs/schedule',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }

