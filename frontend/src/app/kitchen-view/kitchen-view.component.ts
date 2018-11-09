import { Component, OnInit } from '@angular/core';
import { MenuService } from '../menu.service';
import { MenuItem } from '../shared/models/menuitem';
import { OrderService } from '../order.service';
import { OrderItem } from '../shared/models/orderitem';  

@Component({
  selector: 'app-kitchen-view',
  templateUrl: './kitchen-view.component.html',
  styleUrls: ['./kitchen-view.component.scss']
})

export class KitchenViewComponent implements OnInit {


  order$: OrderItem[];  
  orderItems$ : MenuItem[];
  menu$: MenuItem[];

  // TODO Convert this into an order with a list of items or something
  selectedMenuItems: MenuItem[] = [];
  menuTypes: String[] = [];
  today = new Date();
  type:String[]=[];
  


  constructor(
    private orderService: OrderService,
    private menuService: MenuService  
  ) { }
  
  public toggleNamedColor(item: OrderItem): void {
    for (let i = 0; i < this.order$.length; i++) {
      if (this.order$[i] === item) {
        if(item.ionicNamedColor === 'primary') { 
          item.ionicNamedColor = 'accent'
          item.cardColor = 'orange'
          item.buttonStatus="In Progress"
        } 
        else if(item.ionicNamedColor === 'accent'){
          item.ionicNamedColor = 'warn'
          item.cardColor = 'lime'
          item.buttonStatus="Done"
        }
        else {
          item.ionicNamedColor = 'primary'
          item.cardColor = 'lightGrey'
          item.buttonStatus="Ordered"
        }
        break;
      }
    }
  }

  public toggleColor(): void {
    if(this.type === ["Poultry"]) { 
      // this.typeColor = 'lightPink'
    } 
    else {
      // this.typeColor='LightGreen'
    }
  }

  ngOnInit() {    
    this.GetOrder();
    this.GetMenu();
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
        this.order$['ionicNamedColor'] = 'primary';
        this.order$['cardColor'] = 'lightGrey';
        this.order$['typeColor'] = 'red';
        this.order$['timeFormatted'] = [];
        this.order$['buttonStatus'] = "Ordered"
        this.type = this.GetMenuTypes(this.order$);
        this.order$['timeFormatted'] = this.GetOrderTime(this.order$);
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

