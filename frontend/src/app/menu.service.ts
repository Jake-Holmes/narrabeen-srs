import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  GetMenu() {
    return this.http.get('http://localhost:5000/api/menu');
  }
}
