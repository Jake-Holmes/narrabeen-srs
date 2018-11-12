import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MenuItem } from '../shared/models/menuitem';
import { MenuService } from '../menu.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-menu-item-admin',
  templateUrl: './menu-item-admin.component.html',
  styleUrls: ['./menu-item-admin.component.scss']
})
export class MenuItemAdminComponent implements OnInit {

  item: MenuItem;
  image: string;
  imageUploadSrc: any;
  imageUploadType: string;
  imageUploadBase64: string;

  constructor(
    private route: ActivatedRoute,
    private menuService: MenuService,
    private location: Location,
    private _sanitizer: DomSanitizer
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
      const reader = new FileReader(),
            file = event.target.files[0];

      this.imageUploadType = file.type;
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(event): void {
    const binaryString = event.target.result,
          typeString = 'data:' + this.imageUploadType;

    this.imageUploadBase64 = btoa(binaryString);
    this.imageUploadSrc = this._sanitizer.bypassSecurityTrustResourceUrl(typeString + ';base64,' + this.imageUploadBase64);
  }

  Save(): void {
    if (this.item.id) {
      // Editing Existing Item
      this.menuService.editMenuItem(this.item, this.imageUploadBase64).subscribe(() => this.GoBack());
    } else {
      // Creating New Item
      this.menuService.createMenuItem(this.item).subscribe(() => this.GoBack());
    }
  }

  Delete(): void {
    this.menuService.deleteMenuItem(this.item.id).subscribe(() => this.GoBack());
  }

  GoBack(): void {
    this.location.back();
  }
}
