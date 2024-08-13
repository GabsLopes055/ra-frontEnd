import { Routes } from '@angular/router';
import { LoginComponent } from './public/login/login.component';
import { RegisterComponent } from './public/register/register.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'register',
    loadComponent: () =>
      import('../app/public/register/register.component').then(
        (register) => register.RegisterComponent
      ),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('../app/private/admin/admin.module').then(
        (module) => module.AdminModule
      ),
  },
];
