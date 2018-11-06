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

  GetMenu() {
    return this.http.get<MenuItem[]>(this.baseRoute + 'menu/all');
  }

  getMenuItem(id: number) {
    return this.http.get<MenuItem>(this.baseRoute + 'menu?id=' + id);
  }

  createMenuItem(menuItem: MenuItem) {
    // TODO Test This
    return this.http.post(this.baseRoute + 'menu', menuItem, httpOptions);
  }

  editMenuItem(menuItem: MenuItem) {
    const menuUpdateData = {
      id: menuItem.id,
      name: menuItem.name,
      description: menuItem.description,
      base_price: menuItem.base_price,
      active: menuItem.active,
      menu_item_type: menuItem.menu_item_type
    };
    return this.http.put(this.baseRoute + 'menu', JSON.stringify(menuUpdateData), httpOptions);
  }
}
