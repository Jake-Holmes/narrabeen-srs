import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MenuItem } from '../shared/models/menuitem';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-menu-item-admin',
  templateUrl: './menu-item-admin.component.html',
  styleUrls: ['./menu-item-admin.component.scss']
})
export class MenuItemAdminComponent implements OnInit {

  item: MenuItem;

  constructor(
    private route: ActivatedRoute,
    private menuService: MenuService,
    private location: Location
  ) { }

  ngOnInit() {
    this.GetMenuItem();
  }

  GetMenuItem(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    if (id) {
      this.menuService.getMenuItem(id).subscribe(menuItem => this.item = menuItem);
    } else {
      this.item = new MenuItem;
    }
  }

  Save(): void {
    if (this.item.id) {
      // Editing Existing Item
      this.menuService.editMenuItem(this.item).subscribe(() => this.GoBack());
    } else {
      // Creating New Item
      this.menuService.createMenuItem(this.item).subscribe(() => this.GoBack());
    }
  }

  GoBack(): void {
    this.location.back();
  }
}
