import { Component, OnInit } from '@angular/core';
import { MenuService } from '../menu.service';
import { MenuItem } from '../menu';
import { CartService } from '../cart.service';

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

  constructor(
    private menuService: MenuService,
    private cartService: CartService
    ) { }

  ngOnInit() {
    this.GetMenu();
    this.cartService.items$.subscribe(i => this.selectedMenuItems = i);
  }

  GetMenu(): void {
    this.menuService.GetMenu().subscribe(data => {
      this.menu$ = data;
      this.menuTypes = this.GetMenuTypes(data);
    });
  }

  GetMenuTypes(data): String[] {
    const typeList = data.map((menuItem: MenuItem) => menuItem.type);

    // Unique Type List
    return typeList.filter((value, index, self) => self.indexOf(value) === index);
  }

  SelectMenuItem(menuItem: MenuItem): void {
    this.cartService.AddItem(menuItem);

    localStorage.setItem("avct_item", JSON.stringify(this.selectedMenuItems));
  }

}
