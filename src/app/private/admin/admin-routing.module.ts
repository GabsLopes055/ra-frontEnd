import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../admin/pages/dashboard/dashboard.component').then(
        (dashboard) => dashboard.DashboardComponent
      ),
  },
  {
    path: 'usuarios',
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
