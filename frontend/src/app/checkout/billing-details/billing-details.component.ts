import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { BillingService } from "./../../shared/services/billing.service";
import { User, CustomerDetail } from "./../../shared/models/customer";
import { CartService } from '../../cart.service';
import { Location } from '@angular/common';
import { MenuItem } from '../../shared/models/menuitem';
import { TableAuthService } from "../../auth/table-auth.service";
import { OrderService } from './../../order.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-billing-details',
  templateUrl: './billing-details.component.html',
  styleUrls: ['./billing-details.component.scss']
})
export class BillingDetailsComponent implements OnInit {
  products: MenuItem[];
  userDetail: CustomerDetail;
  qrCode = null;
  takeAwayCustomer = false;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router,
    private tableAuth: TableAuthService
  ) {
    this.userDetail = new CustomerDetail();
    this.products = cartService.getLocalCartProducts();
   }

  ngOnInit() {
  }

  updateUserDetails(form: NgForm) {
    const data = form.value;
    this.userDetail.firstName = data['firstName'];
    this.userDetail.lastName = data['lastName'];
    this.userDetail.emailId = data['email'];
    this.userDetail.phoneNumber = data['phoneNumber'];
    this.orderService.createCustomer(this.userDetail).subscribe(res => { 
      console.log(data);
    });

    this.router.navigateByUrl('/checkout/result');
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
}
