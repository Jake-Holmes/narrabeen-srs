import { Injectable } from '@angular/core';
import { MenuItem } from './shared/models/menuitem';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items$: BehaviorSubject<MenuItem[]> = new BehaviorSubject([]);
  items: MenuItem[] = [];
  totalProductsInCart = 0;

  constructor() { }

  AddItem(item: MenuItem) {
    item.index = this.totalProductsInCart;
    this.items.push(item);
    this.items$.next(this.items);
    this.totalProductsInCart++;
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

  removeLocalCartProduct(product: MenuItem) {
    const products: MenuItem[] = JSON.parse(localStorage.getItem("avct_item"));

    for (let i = 0; i < products.length; i++) {
      if (products[i].index === product.index) {
        products.splice(i, 1);
        break;
      }
    }
    // ReAdding the products after remove
    localStorage.setItem("avct_item", JSON.stringify(products));
  }

  getLocalCartProducts(): MenuItem[] {
    const products: MenuItem[] = JSON.parse(localStorage.getItem("avct_item")) || [];
    return products;
  }
}
