import { Component, OnInit } from '@angular/core';
import { MenuService } from '../menu.service';
import { Observable } from 'rxjs';
import { MenuItem } from './menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menu$: MenuItem[];

  // TODO Convert this into an order with a list of items or something
  selectedMenuItems: MenuItem[] = [];
  menuTypes: String[] = [];
  today = new Date();

  constructor(private menuService: MenuService) { }

  ngOnInit() {
    this.GetMenu();
  }

  GetMenu(): void {
    this.menuService.GetMenu().subscribe(data => {
      this.menu$ = data;
      this.menuTypes = this.GetMenuTypes(data);
    });
  }

  GetMenuTypes(data): String[] {
    const typeList: String[] = [];

    data.map((menuItem: MenuItem) => menuItem.type).forEach(element => {
      if (this.menuTypes.indexOf(element)) {
        typeList.push(element);
      }
    });

    return typeList;
  }

  SelectMenuItem(menuItem: MenuItem): void {
    this.selectedMenuItems.push(menuItem);
  }

}
