import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GrantAccessToTabsGuard } from '../grant-access-to-tabs.guard';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    canActivate: [GrantAccessToTabsGuard],
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        children : [
          {
            path:'',
            loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule),
          },
          {
            path: 'post-details/:id',
            loadChildren: () => import('../post-details/post-details.module').then( m => m.PostDetailsPageModule)
          }
        ]
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab2',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tabs/(one:one)',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
