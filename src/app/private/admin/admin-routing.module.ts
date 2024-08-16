import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { guardRouterGuard } from '../../guard-router.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [guardRouterGuard],
    loadComponent: () =>
      import('../admin/pages/dashboard/dashboard.component').then(
        (dashboard) => dashboard.DashboardComponent
      ),
  },
  {
    path: 'usuarios',
    canActivate: [guardRouterGuard],
    loadComponent: () =>
      import('../admin/pages/usuarios/usuarios.component').then(
        (usuarios) => usuarios.UsuariosComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
