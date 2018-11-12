import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OrderItem } from './shared/models/orderitem';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable, BehaviorSubject } from 'rxjs';
import { isNgTemplate } from '@angular/compiler';
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

  public http1;
  private baseRoute = 'https://jakeholmes.me:5000/';

  constructor(private http: HttpClient) {
    this.http1 = http;
  }

  GetOrder() {
    let orderRoute = 'order/items/all';
    return this.http.get<OrderItem[]>(this.baseRoute + orderRoute);
    //return this.http.get<OrderItem[]>('assets/testdataorders.json');
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

 // order/items?id:=orderItem_id&status:=orderItem_status&slot:=orderItem_slot

  /*editOrderItem():void {
      /*let orderUpdateData = {
      id: 1,
      status: 'inprogress',
      slot: 3
      };
      //https://jakeholmes.me:5000/order/items?id=1&status=ready&slot=3
    //return this.http.patch(this.baseRoute+'order/items?',JSON.stringify(orderUpdateData),httpOptions);
     this.http.put("https://jakeholmes.me:5000/order/items", { id: 1, status: "inprogress", slot: 2 });
}
  editOrderItem (ordr: OrderItem): Observable<any> {
    return this.http.put("https://jakeholmes.me:5000/order/items", ordr, httpOptions);
  }*/

  /*GetOrder() {
    
    //return this.http.get<MenuItem[]>('assets/testdata.json');
    //return this.http.get<OrderItem[]>('assets/testdataorders.json');
    return this.http.get<OrderItem[]>('https://jakeholmes.me:5000/order/items/all');
    //return this.http.get<MenuItem[]>('assets/testdata.json');
  }*/
}