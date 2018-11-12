import { Component, OnInit } from '@angular/core';
import { CartService } from '../../cart.service';
import { Location } from '@angular/common';
import { MenuItem } from '../../shared/models/menuitem';


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  checkoutProducts: MenuItem[];
  date: number;
  totalPrice = 0;

  constructor(
    private cartService: CartService,
    private location: Location,
  ) {

    const products = this.cartService.getLocalCartProducts();

    this.checkoutProducts = products;

    products.forEach(product => {
      this.totalPrice += product.base_price;
      console.log(product);
    });

    this.date = Date.now();
   }

  ngOnInit() {
  }

}
