import { Component, OnInit } from '@angular/core';
import { MenuService } from '../menu.service';
import { MenuItem } from '../shared/models/menuitem';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.scss']
})
export class MenuAdminComponent implements OnInit {

  menuList: MenuItem[] = [];

  constructor(
    private menuService: MenuService,
    private router: Router
  ) { }

  ngOnInit() {
    this.GetMenu();
  }

  GetMenu(): void {
    this.menuService.GetMenu().subscribe(data => {
      this.menuList = data;
    });
  }

  CreateNewItem(): void {
    console.log('Navigating!');
    this.router.navigate(['/menu-item-create-edit']);
  }
}
