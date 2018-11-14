import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { BillingService } from "./../../shared/services/billing.service";
import { User, CustomerDetail } from "./../../shared/models/customer";
import { CartService } from '../../cart.service';
import { Location } from '@angular/common';
import { MenuItem } from '../../shared/models/menuitem';
import { AuthService } from "./../../shared/services/auth.service";
import { TableAuthService } from "../../auth/table-auth.service";

@Component({
  selector: 'app-billing-details',
  templateUrl: './billing-details.component.html',
  styleUrls: ['./billing-details.component.scss']
})
export class BillingDetailsComponent implements OnInit {
  userDetails: User;
  products: MenuItem[];
  userDetail: CustomerDetail;

  constructor(
    authService: AuthService,
    private tableAuthService: TableAuthService,
    private billingService: BillingService,
    private cartService: CartService,
    private location: Location
  ) {
    this.userDetail = new CustomerDetail();
    this.products = cartService.getLocalCartProducts();
    this.userDetails = authService.getLoggedInUser();
   }

  ngOnInit() {
  }

  updateUserDetails(form: NgForm) {
    const data = form.value;

    data["emailId"] = this.userDetails.emailId;
    data["userId"] = this.userDetails.$key;
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

}
