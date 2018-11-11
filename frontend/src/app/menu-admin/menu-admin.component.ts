import { Component, OnInit } from '@angular/core';
import { MenuService } from '../menu.service';
import { MenuItem } from '../shared/models/menuitem';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.scss']
})
export class MenuAdminComponent implements OnInit {

  menuList: MenuItem[] = [];

  constructor(
    private menuService: MenuService,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.authGuard();
    this.GetMenu();
  }

  GetMenu(): void {
    this.menuService.GetMenu().subscribe(data => {
      this.menuList = data;
    });
  }

  CreateNewItem(): void {
    this.router.navigate(['/menu-item-create-edit']);
  }

  private async authGuard() {
    if (!await this.authService.authguard()) {
      this.router.navigate(['/staffLogin']);
    }
    return true;
  }
}
