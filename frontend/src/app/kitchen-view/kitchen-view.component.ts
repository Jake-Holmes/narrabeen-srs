import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MenuService } from '../menu.service';
import { Observable } from 'rxjs';
import { MenuItem } from '../menu';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-kitchen-view',
  templateUrl: './kitchen-view.component.html',
  styleUrls: ['./kitchen-view.component.scss']
})
export class KitchenViewComponent implements OnInit {

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
  }

}
