import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MenuItem } from './shared/models/menuitem';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private baseRoute = 'https://jakeholmes.me:5000/';

  constructor(private http: HttpClient) { }

  GetMenu(activeOnly?: boolean) {
    let menuRoute = 'menu/all';

    if (activeOnly) {
      menuRoute += '?active=true';
    }

    return this.http.get<MenuItem[]>(this.baseRoute + menuRoute);
  }

  getMenuItem(id: number) {
    return this.http.get<MenuItem>(this.baseRoute + 'menu?id=' + id);
  }

  createMenuItem(menuItem: MenuItem) {
    return this.http.post(this.baseRoute + 'menu',  JSON.stringify(menuItem), httpOptions);
  }

  editMenuItem(menuItem: MenuItem, base64Image?: string) {
    const menuUpdateData = {
      id: menuItem.id,
      name: menuItem.name,
      description: menuItem.description,
      base_price: menuItem.base_price,
      active: menuItem.active,
      menu_item_type: menuItem.menu_item_type,
      image: base64Image
    };

    if (base64Image) {
      menuUpdateData.image = base64Image;
    }

    return this.http.put(this.baseRoute + 'menu', JSON.stringify(menuUpdateData), httpOptions);
  }

  deleteMenuItem(menuItemId: number) {
    return this.http.delete(this.baseRoute + 'menu?id=' + menuItemId, httpOptions);
  }
}
