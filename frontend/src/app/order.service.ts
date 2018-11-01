import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderItem } from './order';
import { Observable, BehaviorSubject } from 'rxjs';
 

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { 
  }

  GetOrder() {
    
    //return this.http.get<MenuItem[]>('assets/testdata.json');
    return this.http.get<OrderItem[]>('assets/testdataorders.json');
    //return this.http.get<OrderItem[]>('https://jakeholmes.me:5000/order/items/all');
    //return this.http.get<MenuItem[]>('assets/testdata.json');
  }

  getOrderItem(id: number) {
    // TODO implement this using actual api route
    return this.http.get<OrderItem[]>('assets/testdataorders.json');
    //return this.http.get<OrderItem[]>('https://jakeholmes.me:5000/order?id="+id+"');
  }
}