import { Component, OnInit } from '@angular/core';
import { MenuService } from '../menu.service';
import { MenuItem } from '../shared/models/menuitem';
import { CartService } from '../cart.service';
import { ActivatedRoute } from '@angular/router';
import { TableAuthService } from '../auth/table-auth.service';
import { MatSnackBar } from '@angular/material';

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
    private route: ActivatedRoute,
    private tableAuth: TableAuthService,
    private menuService: MenuService,
    private cartService: CartService
    ) { }

  ngOnInit() {
    // Check if route has a QR code passed as a paramter
    const qrCode = this.route.snapshot.queryParams.code;

    this.GetMenu();
    this.cartService.items$.subscribe(i => this.selectedMenuItems = i);

    if (qrCode) {
      this.tableAuth.setQrCode(qrCode);
    }
  }

  GetMenu(): void {
    this.menuService.GetMenu(true).subscribe(data => {
      this.menu$ = data;
      this.menuTypes = this.GetMenuTypes(data);
    });
  }

  GetMenuTypes(data): String[] {
    const typeList = data.map((menuItem: MenuItem) => menuItem.menu_item_type);

    // Unique Type List
    return typeList.filter((value, index, self) => self.indexOf(value) === index);
  }

  SelectMenuItem(menuItem: MenuItem): void {
    this.cartService.AddItem(menuItem);
    localStorage.setItem('avct_item', JSON.stringify(this.selectedMenuItems));
  }
}
