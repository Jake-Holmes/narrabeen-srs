import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MenuService } from '../menu.service';
import { Observable } from 'rxjs';
import { MenuItem } from '../menu';
import { OrderService } from '../order.service';
import { OrderItem } from '../order';  


@Component({
  selector: 'app-kitchen-view',
  templateUrl: './kitchen-view.component.html',
  styleUrls: ['./kitchen-view.component.scss']
})
export class KitchenViewComponent implements OnInit {


  order$: OrderItem[];



  constructor(    
    private orderService: OrderService
  ) { }

  ngOnInit() {    
    this.GetOrder();
  }

  GetOrder(): void {
    this.orderService.GetOrder().subscribe(data => {
      this.order$ = data;
    });
  }

  GetOrderId(data): String[] {
    const typeList = data.map((orderItem: OrderItem) => orderItem.id);

    // Unique Type List
    return typeList.filter((value, index, self) => self.indexOf(value) === index);
  }


}
