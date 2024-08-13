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

  setMenu(menu?: Menu) {
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
        route: '/admin/dashboard',
        checked: false,
      },
      {
        icon: 'person',
        label: 'Usuarios',
        route: '/admin/dashboard',
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
