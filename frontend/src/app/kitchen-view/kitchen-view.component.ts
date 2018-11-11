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

  orderIt: OrderItem;
  order$: OrderItem[];  
  orderItems$ : MenuItem[];
  menu$: MenuItem[];

  // TODO Convert this into an order with a list of items or something
  selectedMenuItems: MenuItem[] = [];
  menuTypes: String[] = [];
  today = new Date();
  type:String[]=[];
  stat: string;
  


  constructor(
    private orderService: OrderService,
    private menuService: MenuService  
  ) { }
  
  public toggleNamedColor(item: OrderItem): void {
    /*for (let i = 0; i < this.order$.length; i++) {
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
          item.cardColor = 'white'
          item.buttonStatus="Ordered"
        }
        break;
      }
    }*/
    for (let i = 0; i < this.order$.length; i++) {
      if (this.order$[i] === item) {
        if(this.order$[i].status === 'confirmed') {
          this.order$[i].status = 'inprogress'; 
                this.order$[i].cardColor = '#FFB74D';
          this.orderService.editOrderItem(item,'inprogress');
        } 
        else if(this.order$[i].status === 'inprogress') {
          this.order$[i].status = 'ready'; 
                this.order$[i].cardColor = '#9CCC65';
                this.orderService.editOrderItem(item,'ready');
        } 
        else if(this.order$[i].status === 'ready') {
          this.order$[i].status = 'confirmed'; 
              this.order$[i].cardColor = '#CFD8DC'
              this.orderService.editOrderItem(item,'confirmed');
        } 
        break;
      }
    }
  }

 /* public toggleColor(item: OrderItem): void {
    for (let i = 0; i < this.order$.length; i++) {
      if (item[i].menu_item.menu_item_type === 'Poultry'){
        item.typeColor = 'lightRed'
      }
        else if (item.menu_item.menu_item_type === 'Meat'){
          item.typeColor = 'lightGreen'
        }
        else if (item.menu_item.menu_item_type === 'Seafood'){
          item.typeColor = 'lightPink'
        }
        else {
          item.typeColor = 'lightBlue'
        }
      }
    }*/

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
        for (let i = 0; i < this.order$.length; i++) {
          if (this.order$[i].menu_item.menu_item_type === 'Poultry'){
            this.order$[i].typeColor = '#4DB6AC'
          }
            else if (this.order$[i].menu_item.menu_item_type === 'Seafood'){
              this.order$[i].typeColor = '#00ACC1'
            }
            else if (this.order$[i].menu_item.menu_item_type === 'Meat'){
              this.order$[i].typeColor = 'indianred'
            }
            else {
              this.order$[i].typeColor = '#B39DDB'
            }
          }
          for (let i = 0; i < this.order$.length; i++) {
            if (this.order$[i].status === 'confirmed'){
              this.order$[i].cardColor = '#CFD8DC'
            }
              else if (this.order$[i].status === 'inprogress'){
                this.order$[i].cardColor = '#FFB74D'
              }
              else if (this.order$[i].status === 'ready'){
                this.order$[i].cardColor = '#9CCC65'
              }
              else {
                this.order$[i].cardColor = 'lightBlue'
              }
            }
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

