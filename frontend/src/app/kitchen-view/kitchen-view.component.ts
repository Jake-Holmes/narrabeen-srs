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
  orderItems$ : MenuItem[];
  public ionicNamedColor: string = 'primary';
  public cardColor: string = 'lightGrey';
  public typeColor: string = 'Red';
  public timeFormatted: String[] = [];
  menu$: MenuItem[];
  buttonStatus: string="Ordered";

  // TODO Convert this into an order with a list of items or something
  selectedMenuItems: MenuItem[] = [];
  menuTypes: String[] = [];
  today = new Date();
  type:String[]=[];
  


  constructor(
    private orderService: OrderService,
    private menuService: MenuService  
  ) { }
  
  


  public toggleNamedColor(): void {
    if(this.ionicNamedColor === 'primary') { 
      this.ionicNamedColor = 'accent'
      this.cardColor = 'orange'
      this.buttonStatus="In Progress"
    } 
    else if(this.ionicNamedColor === 'accent'){
      this.ionicNamedColor = 'warn'
      this.cardColor = 'lime'
      this.buttonStatus="Done"
    }
    else {
      this.ionicNamedColor = 'primary'
      this.cardColor = 'lightGrey'
      this.buttonStatus="Ordered"
    }
  }

  public toggleColor(): void {
    if(this.type === ["Poultry"]) { 
      this.typeColor = 'lightPink'
    } 
    else {
      this.typeColor='LightGreen'
    }
  }

  ngOnInit() {    
    this.GetOrder();
    this.GetMenu();
    // this.type=this.GetMenuTypes(this.order$);
    // this.timeFormatted=this.GetOrderTime(this.order$);
  }


  

  GetMenu(): void {
    this.menuService.GetMenu().subscribe(data => {
      this.menu$ = data;
      this.menuTypes = this.GetMenuTypes(data);
    });
  }

  GetMenuTypes(data): String[] {
    const typeList = data.map((menuItem: MenuItem) => menuItem.type);

    // Unique Type List
    return typeList.filter((value, index, self) => self.indexOf(value) === index);
  }


  GetOrder(): void {
    this.orderService.GetOrder().subscribe(data => {
        this.order$ = data;
        this.type = this.GetMenuTypes(this.order$);
        this.timeFormatted = this.GetOrderTime(this.order$);
      }
    );
  }

  GetOrderId(data): String[] {
    const typeList = data.map((orderItem: OrderItem) => orderItem.id);
    // Unique Type List
    return typeList;
  }


  GetOrderTime(data): String[]{
    const typeList = data.map((orderItem: OrderItem) => orderItem.date_created);
    // Unique Type List
    return typeList; 
  }
  
}

