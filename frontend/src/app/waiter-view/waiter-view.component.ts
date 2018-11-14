import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderItem } from '../shared/models/orderitem';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OrderService } from '../order.service';
import { MatTable } from '@angular/material';
import { Router } from '@angular/router'

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
  @ViewChild(MatTable) waiterTable: MatTable<OrderItem>
  

  constructor(
    private http: HttpClient,
  ) {
    this.displayedColumns = ['id', 'slot', 'dishName', 'button']
  }

  ngOnInit() {
    this.assignOrderItems();
  }

  private async assignOrderItems(): Promise<Boolean> {
    this.orderItems = await this.getOrderItems();
    return true;
  }

  private async getOrderItems(): Promise<OrderItem[]> {
    return this.http.get<OrderItem[]>('https://jakeholmes.me:5000/order/items/all?status=ready').toPromise();
  }

  public async changeStatus(id: number) {
    //var tmpObject = await this.findItemFromId(id);
    //this.orderItems.splice(tmpObject);
    var link = 'https://jakeholmes.me:5000/order/items?id='+ id +'&status=delivered&slot=0';
    await this.http.put(link, null, httpOptions).subscribe();
    await this.assignOrderItems();
    //this.waiterTable.renderRows();
    location.reload()
  }

  /*
  private async findItemFromId(id: number):Promise<number> {
    return this.orderItems.indexOf(this.orderItems.find(obj => obj.id == id));
  }*/
}
