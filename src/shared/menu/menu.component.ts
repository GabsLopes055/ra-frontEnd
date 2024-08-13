import { Component } from '@angular/core';
import { Menu, MenuService } from './menu.service';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'gbs-menu',
  standalone: true,
  imports: [
    NgClass,
    RouterLink
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  isOpen: boolean = true;

  menu: Menu[] = [];

  constructor(
    private readonly menuService: MenuService
  ) {
    this.menuService._menu.subscribe(item => {
      this.menu = item;
    })
  }

  openClose() {
    this.isOpen = !this.isOpen;
  }

}
