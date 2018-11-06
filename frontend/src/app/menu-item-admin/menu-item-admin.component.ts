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
  image: string;
  base64textString: string;

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
      this.menuService.getMenuItem(id).subscribe(menuItem => {
        this.item = menuItem;
        this.image = this.item.image;
      });
    } else {
      this.item = new MenuItem;
    }
  }

  onImageChange(event): void {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(event.target.files[0]);
    }
  }

  _handleReaderLoaded(event): void {
    const binaryString = event.target.result;
    this.base64textString = btoa(binaryString);
    console.log(btoa(binaryString));
  }

  // UploadImage(): {

  // }

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
