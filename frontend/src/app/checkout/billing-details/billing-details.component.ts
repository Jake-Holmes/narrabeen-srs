import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { BillingService } from "./../../shared/services/billing.service";
import { User, CustomerDetail } from "./../../shared/models/customer";
import { CartService } from '../../cart.service';
import { Location } from '@angular/common';
import { MenuItem } from '../../shared/models/menuitem';



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
    private billingService: BillingService,
    private cartService: CartService,
    private location: Location
  ) { }

  ngOnInit() {
  }

}
