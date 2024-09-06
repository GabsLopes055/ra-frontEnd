import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivateFn } from '@angular/router';
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
  {
    path: 'produtos',
    canActivate: [guardRouterGuard],
    loadComponent: () =>
      import('../admin/pages/produtos/produtos.component').then(
        (produtos) => produtos.ProdutosComponent
      ),
  },
  {
    path: 'categorias',
    canActivate: [guardRouterGuard],
    loadComponent: () =>
      import('../admin/pages/categorias/categorias.component').then(
        (categorias) => categorias.CategoriasComponent
      ),
  },
  {
    path: 'vendas',
    canActivate: [guardRouterGuard],
    loadComponent: () =>
      import('../admin/pages/vendas/vendas.component').then(
        (vendas) => vendas.VendasComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
