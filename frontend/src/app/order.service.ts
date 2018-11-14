import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OrderItem } from './shared/models/orderitem';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable, BehaviorSubject } from 'rxjs';
import { isNgTemplate } from '@angular/compiler';
import { MenuItem } from './shared/models/menuitem';
import { TableAuthService } from './auth/table-auth.service';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class OrderService {

  public http1;
  private baseRoute = 'https://jakeholmes.me:5000/';

  constructor(private http: HttpClient, private tableAuth: TableAuthService) {
    this.http1 = http;
  }

  GetOrder() {
    let orderRoute = 'order/items/all';
    return this.http.get<OrderItem[]>(this.baseRoute + orderRoute);
  }

  createTakeawayOrder(menuitems: MenuItem[]) {
    const orderRoute = 'order/takeaway?id=' + 1 + '&time=' + '2012-10-09T19:00:55Z',
          menuItemIds = menuitems.map((menuItem: MenuItem) => menuItem.id);

    return this.http.post(this.baseRoute + orderRoute, JSON.stringify(menuItemIds), httpOptions);
  }

  getOrderItem(id: number) {
    return this.http.get<OrderItem>(this.baseRoute + 'order?id=' + id);
  }

  createOrderItem(orderItem: OrderItem) {
    return this.http.post(this.baseRoute + 'order',  JSON.stringify(orderItem), httpOptions);
  }

  editOrderItem(ordr: OrderItem) {
    const orderUpdateData = {
      id: ordr.id,
      status: "inprogress"
    };

    return this.http.put(this.baseRoute + 'order/items', JSON.stringify(orderUpdateData), httpOptions);
  }


  public putUrl(url, data?: Object, cb?: Function, options?: Object) {
    const vm = this;
    vm.http.put(url, data, options)
      .subscribe(res => {
        cb(res);
      });
  }


  changeStatus(orderitem, i) {
    let that = this;
    let urlStr = 'https://jakeholmes.me:5000/order/items?id='+orderitem.id+'&status='+orderitem.status+'&slot='+orderitem.slot
    this.http1.putUrl(urlStr, {}, res => {
      console.dir(res);
      orderitem.status = "orderitem.status";
    });
  }

  UpdateStatus(orderId: number, status: string) {
    const orderRoute = 'order/items?id=' + orderId + '&status=' + status;
    return this.http.put(this.baseRoute + orderRoute, {}, httpOptions);
  }
}
