import { Component, OnInit, Input } from '@angular/core';
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

  constructor(
    private route: ActivatedRoute,
    private menuService: MenuService,
    private cartService: CartService,
    private location: Location
  ) { }

  @Input() item: MenuItem;

  ngOnInit() {
    // If item was not passed as a param, get from routeLink url params
    if (!this.item) {
      this.GetMenuItem();
    }
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
