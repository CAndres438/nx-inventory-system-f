import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { RegisterComponent } from './auth/register/register';
import { LayoutComponent } from './layout/layout';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'inventario', pathMatch: 'full' },


  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },


  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'inventario',
        loadComponent: () =>
          import('./pages/inventory/inventory').then(m => m.InventoryComponent),
      },
      {
        path: 'roles',
        loadComponent: () =>
          import('./pages/roles/roles').then(m => m.RolesComponent),
      }
    ]
  },

  { path: '**', redirectTo: 'login' }
];
