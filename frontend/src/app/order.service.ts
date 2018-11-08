import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { OrderItem } from './shared/models/orderitem';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import { Observable, BehaviorSubject } from 'rxjs';
import { isNgTemplate } from '@angular/compiler';
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

export class OrderService {
  
  private baseRoute = 'https://jakeholmes.me:5000/';

  constructor(private http: HttpClient) { }

  GetOrder() {
    let orderRoute = 'order/items/all';
    return this.http.get<OrderItem[]>(this.baseRoute + orderRoute);
    //return this.http.get<OrderItem[]>('assets/testdataorders.json');
  }

  getOrderItem(id: number) {
    return this.http.get<OrderItem>(this.baseRoute + 'order?id=' + id);
  }

  createOrderItem(orderItem: OrderItem) {
    return this.http.post(this.baseRoute + 'order',  JSON.stringify(orderItem), httpOptions);
  }

 // order/items?id:=orderItem_id&status:=orderItem_status&slot:=orderItem_slot

  editOrderItem(orderItem: OrderItem, stat: string ): Observable<OrderItem> {
      const orderUpdateData = {
      id: orderItem.id+"",
      status: stat,
      slot: orderItem.slot+""
      }
      //https://jakeholmes.me:5000/order/items?id=1&status=ready&slot=3
    return this.http.put<OrderItem>(this.baseRoute+'order/items',JSON.stringify(orderUpdateData));
  }


  /*GetOrder() {
    
    //return this.http.get<MenuItem[]>('assets/testdata.json');
    //return this.http.get<OrderItem[]>('assets/testdataorders.json');
    return this.http.get<OrderItem[]>('https://jakeholmes.me:5000/order/items/all');
    //return this.http.get<MenuItem[]>('assets/testdata.json');
  }*/
}