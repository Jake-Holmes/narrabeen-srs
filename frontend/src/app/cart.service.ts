import { Injectable } from '@angular/core';
import { MenuItem } from './shared/models/menuitem';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items$: BehaviorSubject<MenuItem[]> = new BehaviorSubject([]);
  items: MenuItem[] = [];

  constructor() { }

  AddItem(item: MenuItem) {
    this.items.push(item);
    this.items$.next(this.items);
  }

  RemoveItem(item: MenuItem) {
    // this.items; TODO implement this
  }

  CreateOrder() {
    // TODO implement this. Needs order service
  }

  GetItems() {
    return this.items;
  }
}
