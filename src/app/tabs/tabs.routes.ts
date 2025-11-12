import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { loginGuard } from '../guards/login-guard';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadComponent: () =>
          import('../tab1/tab1.page').then((m) => m.Tab1Page),
      },
      {
        path: 'tab2',
        loadComponent: () =>
          import('../tab2/tab2.page').then((m) => m.Tab2Page),
      },
      {
        path: 'tab3',
        loadComponent: () =>
          import('../tab3/tab3.page').then((m) => m.Tab3Page),canActivate:[loginGuard]
      },
      {
        path: 'tab4',
        loadComponent: () =>
          import('../tab4/tab4.component').then((m) => m.Tab4Component),canActivate:[loginGuard]
      },
      {
        path: 'tab5',
        loadComponent: () =>
          import('../tab5/tab5.component').then((m) => m.Tab5Component),canActivate:[loginGuard]
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full',
  },
];
