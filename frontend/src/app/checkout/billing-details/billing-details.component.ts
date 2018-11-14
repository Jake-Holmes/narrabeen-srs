import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { BillingService } from "./../../shared/services/billing.service";
import { User, CustomerDetail } from "./../../shared/models/customer";
import { CartService } from '../../cart.service';
import { Location } from '@angular/common';
import { MenuItem } from '../../shared/models/menuitem';
import { TableAuthService } from "../../auth/table-auth.service";
import { OrderService } from './../../order.service';


@Component({
  selector: 'app-billing-details',
  templateUrl: './billing-details.component.html',
  styleUrls: ['./billing-details.component.scss']
})
export class BillingDetailsComponent implements OnInit {
  userDetails: User;
  products: MenuItem[];
  userDetail: CustomerDetail;
  qrCode = null;
  takeAwayCustomer = false;

  constructor(
    private billingService: BillingService,
    private cartService: CartService,
    private location: Location,
    private orderService: OrderService,
    private tableAuth: TableAuthService
  ) {
    this.userDetail = new CustomerDetail();
    this.products = cartService.getLocalCartProducts();
   }

  ngOnInit() {
  }

  updateUserDetails(form: NgForm) {
    const data = form.value;

    data["emailId"] = this.userDetails.emailId;
    let totalPrice = 0;
    const products = [];
    this.products.forEach(product => {
      delete product["$key"];
      totalPrice += product.base_price;
      products.push(product);
    });

    data["products"] = products;

    data["totalPrice"] = totalPrice;

    data["billingDate"] = Date.now();

    //this.billingService.createBillings(data);
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

  confirmOrder() {
    const products = this.cartService.getLocalCartProducts();
    this.orderService.createTakeawayOrder(products);
  }
}
