import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { RegistersComponent } from './pages/registers/registers.component';
import { IconsComponent } from './pages/icons/icons.component';
import { LoginComponent } from './pages/login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from './auth/auth.guard';

export const AppRoutes: Routes = [
  {
    path: '',
    component:WelcomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component:LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'register',
    // component:IconsComponent,
    component:RegistersComponent,
    pathMatch: 'full',
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [{
      path: '',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(x => x.AdminLayoutModule)
    }]
  },
  {
    path: '**',
    redirectTo: 'welcome'
  }
]
