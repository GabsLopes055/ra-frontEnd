import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  _menu = new BehaviorSubject<Menu[]>([]);

  constructor() {
    this.criarMenu();
  }

  setMenu(menu: Menu) {

    let lista: Menu[] = [];

    this._menu.subscribe((menu) => (lista = menu));

    lista = lista.map((item) => {

      item.checked = false;

      if (menu && item.label == menu.label) {
        item.checked = true;
      }
      return item;
    });

    this._menu.next(lista);
  }

  criarMenu() {
    this._menu.next([
      {
        icon: 'dashboard',
        label: 'Dashboard',
        route: 'dashboard',
        checked: false,
      },
      {
        icon: 'storefront',
        label: 'Vendas',
        route: 'dashboard/vendas',
        checked: false,
      },
      {
        icon: 'production_quantity_limits',
        label: 'Produtos',
        route: 'dashboard/produtos',
        checked: false,
      },
      {
        icon: 'category',
        label: 'Categorias',
        route: 'dashboard/categorias',
        checked: false,
      },
      {
        icon: 'bar_chart',
        label: 'Graficos',
        route: 'dashboard/graficos',
        checked: false,
      },
      {
        icon: 'person',
        label: 'Usuarios',
        route: 'dashboard/usuarios',
        checked: false,
      },
    ]);
  }
}

export interface Menu {
  icon: string;
  label: string;
  route: string;
  checked: boolean;
}
