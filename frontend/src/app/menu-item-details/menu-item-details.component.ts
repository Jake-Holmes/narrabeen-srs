import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MenuItem } from '../shared/models/menuitem';
import { MenuService } from '../menu.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-menu-item-details',
  templateUrl: './menu-item-details.component.html',
  styleUrls: ['./menu-item-details.component.scss']
})
export class MenuItemDetailsComponent implements OnInit {

  item: MenuItem;

  constructor(
    private route: ActivatedRoute,
    private menuService: MenuService,
    private cartService: CartService,
    private location: Location
  ) { }

  ngOnInit() {
    this.GetMenuItem();
  }

  GetMenuItem(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    // TODO remove id checking logic from here when api integrated
    this.menuService.getMenuItem(id).subscribe(menuItem => this.item = menuItem);
  }

  AddToOrder(item: MenuItem): void {
    this.cartService.AddItem(item);
  }

  GoBack(): void {
    this.location.back();
  }
}
