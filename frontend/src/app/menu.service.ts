import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuItem } from './shared/models/menuitem';

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
    return this.http.post(this.baseRoute + 'menu', menuItem);
  }

  editMenuItem(menuItem: MenuItem) {
    // TODO Test This, must have id in menuItem
    return this.http.put(this.baseRoute + 'menu', menuItem);
  }
}
