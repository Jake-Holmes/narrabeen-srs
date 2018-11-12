import { Component, OnInit } from '@angular/core';
import { MenuService } from '../menu.service';
import { MenuItem } from '../shared/models/menuitem';
import { OrderService } from '../order.service';
import { OrderItem } from '../shared/models/orderitem';  
import { ActivatedRoute } from '@angular/router';
import {HttpInterceptorService} from './http-interceptor.service';
import { componentRefresh } from '@angular/core/src/render3/instructions';
import { timer } from 'rxjs';
import { tick } from '@angular/core/testing';


export interface Slot {
  value: string;
  viewValue: string;
}



@Component({
  selector: 'app-kitchen-view',
  templateUrl: './kitchen-view.component.html',
  styleUrls: ['./kitchen-view.component.scss']
})



export class KitchenViewComponent implements OnInit {

  
  slots: Slot[] = [
    {value: '1', viewValue: '1'},
    {value: '2', viewValue: '2'},
    {value: '3', viewValue: '3'},
    {value: '4', viewValue: '4'},
    {value: '5', viewValue: '5'},
    {value: '6', viewValue: '6'}
  ];

  orderIt: OrderItem;
  order$: OrderItem[];  
  orderItems$ : MenuItem[];
  menu$: MenuItem[];
  slotNum:number;

  // TODO Convert this into an order with a list of items or something
  selectedMenuItems: MenuItem[] = [];
  menuTypes: String[] = [];
  today = new Date();
  type:String[]=[];
  id;
  stat: string;
  public http: HttpInterceptorService;
  currStat: string;  
  


  constructor(
    private orderService: OrderService,
    private menuService: MenuService,
    httpService: HttpInterceptorService,
    private route: ActivatedRoute
  ) { 
    this.route.params.subscribe( params => this.id = params.id );
    //this.orders = store.get('ordersObj');
    this.http = httpService;
  }

  changeSlot(data){
    this.slotNum=data;
    alert(data);
  }
  

  itemStatusNext(currentStaus:string):string{
    if(currentStaus=='confirmed'){
      return "In Progress";
    }
    else if(currentStaus=='inprogress'){
      return "Ready";
    }
    else{
      return "Confirmed";
    }
  }

  



  public toggleNamedColor(item, i): void {
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
    /*this.order$[i].status.replace("OrderItemStatus.","") */
    for (let i = 0; i < this.order$.length; i++) {
      if (this.order$[i] === item) {
        if(this.order$[i].status === 'confirmed') {
          //this.order$[i].status = 'inprogress'; 
          this.currStat='Ready';
          // this.order$[i].cardColor = '#FFB74D';
          this.changeStatus(item,i,'inprogress');
          tick(10000);
        } 
        else if(this.order$[i].status === 'inprogress') {
          //this.order$[i].status = 'ready'; 
          this.currStat='Confirmed';
          // this.order$[i].cardColor = '#9CCC65';
          this.changeStatus(item,i,'ready');
          tick(10000);
        } 
        else if(this.order$[i].status === 'ready') {
          //this.order$[i].status = 'confirmed'; 
          this.currStat='In Progress';
          // this.order$[i].cardColor = '#CFD8DC';
          this.changeStatus(item,i,'confirmed');
          tick(10000);
        }
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



  
  
    changeStatus(item, i,stat1:string) {
      let that = this;
      let urlStr = 'https://jakeholmes.me:5000/order/items?id='+item.id+'&status='+stat1+'&slot='+item.slot
      this.http.putUrl(urlStr, {}, res => {
        this.GetOrder();
        console.dir(res);
        //item.status = stat1;
      });
    }



  ngOnInit() {    
    this.GetOrder();
  }


  GetOrder(): void {
    this.orderService.GetOrder().subscribe(data => {
        this.order$ = data;
        this.order$['ionicNamedColor'] = 'primary';
        this.order$['cardColor'] = 'lightGrey';
        for (let i = 0; i < this.order$.length; i++) {
          if (this.order$[i].menu_item.menu_item_type === 'main'){
            this.order$[i].typeColor = '#4DB6AC'
          }
            else if (this.order$[i].menu_item.menu_item_type === 'dessert'){
              this.order$[i].typeColor = '#00ACC1'
            }
            else if (this.order$[i].menu_item.menu_item_type === 'appetizer'){
              this.order$[i].typeColor = 'indianred'
            }
            else {
              this.order$[i].typeColor = '#B39DDB'
            }
          }
          for (let i = 0; i < this.order$.length; i++) {
            if (this.order$[i].status === 'confirmed'){
              this.order$[i].cardColor = '#CFD8DC'
              this.currStat='In Progress'
            }
              else if (this.order$[i].status === 'inprogress'){
                this.order$[i].cardColor = '#FFB74D'
                this.currStat='Ready'
              }
              else if (this.order$[i].status === 'ready'){
                this.order$[i].cardColor = '#9CCC65'
                this.currStat='Confirmed'

              }
              else {
                this.order$[i].cardColor = 'lightBlue'
              }
            }
        this.order$['timeFormatted'] = [];
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

