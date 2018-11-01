import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MenuItem } from '../menu';
import { MenuService } from '../menu.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-menu-item-details',
  templateUrl: './menu-item-details.component.html',
  styleUrls: ['./menu-item-details.component.scss']
})
export class MenuItemDetailsComponent implements OnInit {

  item: MenuItem;

  @Input('item') inputItem: MenuItem;
  @Input('order-mode') orderMode: boolean

  constructor(
    private route: ActivatedRoute,
    private menuService: MenuService,
    private cartService: CartService,
    private location: Location
  ) { }

  ngOnInit() {
    console.log(this.inputItem);
    if (this.inputItem !== undefined) {
      this.item = this.inputItem;
    }
    else
      this.GetMenuItem();

    if (this.orderMode === undefined)
      this.orderMode = true;
  }

  GetMenuItem(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    // TODO remove id checking logic from here when api integrated
    this.menuService.getMenuItem(id).subscribe(menuItem => {
      this.item = menuItem.find(mItem => mItem.id === id);
      console.log(this.item);
    });
    // const menuItems = await this.menuService.getMenuItem(id);
    // this.item = menuItems.find(item => item.id === id);
  }

  AddToOrder(item: MenuItem): void {
    this.cartService.AddItem(item);
  }

  GoBack(): void {
    this.location.back();
  }
}
