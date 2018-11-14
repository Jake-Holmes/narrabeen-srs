import { Component, OnInit } from '@angular/core';
import { OrderItem } from '../shared/models/orderitem';
import { HttpClient } from '@angular/common/http';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-waiter-view',
  templateUrl: './waiter-view.component.html',
  styleUrls: ['./waiter-view.component.scss']
})
export class WaiterViewComponent implements OnInit {
  private displayedColumns = ['id'];
  private orderItems: OrderItem[] = [];
  constructor(
    private orderService: OrderService,
    private http: HttpClient,
  ) {
  }

  ngOnInit() {
    this.getOrderItems();
  }

  public async getOrderItems() {
    this.http.get<OrderItem[]>('https://jakeholmes.me:5000/order/items/all?status=ready').subscribe(data => {
      this.orderItems = data;
      console.log(this.orderItems);
    });
    console.log(this.orderItems);
  }
}
