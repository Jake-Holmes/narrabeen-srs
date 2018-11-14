import { Component, OnInit } from '@angular/core';
import { OrderItem } from '../shared/models/orderitem';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OrderService } from '../order.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Component({
  selector: 'app-waiter-view',
  templateUrl: './waiter-view.component.html',
  styleUrls: ['./waiter-view.component.scss']
})
export class WaiterViewComponent implements OnInit {
  private orderItems: OrderItem[];
  private displayedColumns: string[];

  constructor(
    private orderService: OrderService,
    private http: HttpClient,
  ) {
    this.displayedColumns = ['id', 'slot', 'dishName', 'button']
  }

  ngOnInit() {
    this.assignOrderItems();
  }

  private async assignOrderItems() {
    this.orderItems = await this.getOrderItems();
  }

  private async getOrderItems(): Promise<OrderItem[]> {
    return this.http.get<OrderItem[]>('https://jakeholmes.me:5000/order/items/all?status=ready').toPromise();
  }

  public changeStatus(id: number) {
    var link = 'https://jakeholmes.me:5000/order/items?id='+ id +'&status=delivered&slot=0';
    this.http.put(link, null, httpOptions).subscribe();
    this.assignOrderItems();
  }
}
