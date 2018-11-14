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
  private tables: TableDisplay[] = [];

  constructor(
    private orderService: OrderService,
    private tableService: TableService,
    private http: HttpClient,
  ) {
  }

  ngOnInit() {
    const self = this;
    this.GetTables();

    setInterval(() => {
      self.GetTables();
    }, 6000);
  }

  public async getOrderItems() {
    this.http.get<OrderItem[]>('https://jakeholmes.me:5000/order/items/all?status=ready').subscribe(data => {
      this.orderItems = data;
      console.log(this.orderItems);
    });
    console.log(this.orderItems);
  }

  async GetTables() {
    const tables = await this.tableService.getAllTables();
    const self = this;
    self.tables = [];

    tables.forEach(element => {
      if (element.order) {
        self.tables.push(new TableDisplay(element));
      }
    });
  }

  DeliverOrder(orderId: number) {
    const self = this;
    this.orderService.UpdateStatus(orderId, 'delivered')
    .subscribe(res => {
      self.GetTables();
    });
  }
}

class TableDisplay {
  readyItems: OrderItem[];

  constructor(private table: Table) {
    this.readyItems = this.table.order.order_items.filter((element) => element.status === 'ready');
  }
}
