import { Routes } from '@angular/router';
import { LoginComponent } from './forms/login/login.component';

export const routes: Routes = [
  {path:'',
    component:LoginComponent
  },
  {
    path: 'app',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
];
