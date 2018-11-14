import { Component, OnInit } from '@angular/core';
import { CartService } from '../../cart.service';
import { Location } from '@angular/common';
import { MenuItem } from '../../shared/models/menuitem';
import { TableAuthService } from "../../auth/table-auth.service";
import { OrderService } from './../../order.service';


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  checkoutProducts: MenuItem[];
  qrCode = null;
  takeAwayCustomer = false;
  date: number;
  totalPrice = 0;
  receiptNo: String; 
  OrderName: String = "Test Test";
  tableId: String = "7";

  constructor(
    private cartService: CartService,
    private location: Location,
    private tableAuth: TableAuthService,
    private orderService: OrderService
  ) {
    const products = this.cartService.getLocalCartProducts();

    this.checkoutProducts = products;

    products.forEach(product => {
      this.totalPrice += product.base_price;
    });
    this.totalPrice = +(this.totalPrice.toFixed(2));
    this.date = Date.now();
   }

  ngOnInit() {
    this.receiptNo = Math.random().toString(36).slice(-8).toUpperCase();
  }

  checkCustomer() {
    this.qrCode = this.tableAuth.getQrCode();
    if (this.qrCode == null || this.qrCode == "" || this.qrCode.length < 1) {
      this.takeAwayCustomer = true;
      return true;
    } else {
      return false;
    }
  }

  checkTable() {
    this.qrCode = this.tableAuth.getQrCode();
    if (this.qrCode == null || this.qrCode == "" || this.qrCode.length < 1) {
      this.takeAwayCustomer = false;
      return false;
    } else {
      return true;
    }
  }

  ConfirmOrder() {
    const products = this.cartService.getLocalCartProducts();

    if (this.takeAwayCustomer == true) {
      this.orderService.createTakeawayOrder(products).subscribe(data => { console.log(data) });
    } else {
      this.orderService.createOrder(products, this.qrCode).subscribe(data => { console.log(data) });
    }
  }
}
