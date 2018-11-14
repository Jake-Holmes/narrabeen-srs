import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Location } from '@angular/common';
import { MenuItem } from '../shared/models/menuitem';
import { OrderService } from '../order.service';
import { TableAuthService } from '../auth/table-auth.service';



@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutProducts: MenuItem[];
  totalPrice = 0;

  constructor(
    private cartService: CartService,
    private location: Location
  ) {
    const products = this.cartService.getLocalCartProducts();

    this.checkoutProducts = products;

    products.forEach(product => {
      this.totalPrice += product.base_price;
    });
    this.totalPrice = +(this.totalPrice.toFixed(2));
   }

  ngOnInit() { }
}
