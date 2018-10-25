import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuItem } from './menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  GetMenu() {
    // return this.http.get<MenuItem[]>('https://jakeholmes.me:5000/api/menu/all');
    return this.http.get<MenuItem[]>('assets/testdata.json');
  }

  getMenuItem(id: number) {
    // TODO implement this using actual api route
    return this.http.get<MenuItem[]>('assets/testdata.json');
  }

  // createMenuItem(menuItem: MenuItem) {
  //   this.http.post('')
  // }
}
