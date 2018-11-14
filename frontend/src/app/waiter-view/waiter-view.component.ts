import { Component, OnInit } from '@angular/core';
import { OrderItem } from '../shared/models/orderitem';
import { HttpClient } from '@angular/common/http';
import { OrderService } from '../order.service';
import { TableService } from '../table.service';
import { Table } from '../table';

@Component({
  selector: 'app-waiter-view',
  templateUrl: './waiter-view.component.html',
  styleUrls: ['./waiter-view.component.scss']
})
export class WaiterViewComponent implements OnInit {
  private displayedColumns = ['menu-item', 'deliver-btn'];
  private orderItems: OrderItem[] = [];
  private tables: Table[] = [];

  constructor(
    private orderService: OrderService,
    private tableService: TableService,
    private http: HttpClient,
  ) {
  }

  ngOnInit() {
    this.GetTables();
  }

  public async getOrderItems() {
    this.http.get<OrderItem[]>('https://jakeholmes.me:5000/order/items/all?status=ready').subscribe(data => {
      this.orderItems = data;
      console.log(this.orderItems);
    });
    console.log(this.orderItems);
  }

  async GetTables() {
    let tables = await this.tableService.getAllTables();
    // tables.forEach(element => {
    //   element.order?.order_items = element.order?.order_items.filter(i => i.status === 'ready');
    // });

    this.tables = tables;

  }

  DeliverOrder(orderId: number) {
    const self = this;
    this.orderService.UpdateStatus(orderId, 'delivered')
    .subscribe(res => {
      self.GetTables();
    });
  }
}
