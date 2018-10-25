import { Component, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { Product } from "../shared/models/product";
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart-calculator',
  templateUrl: './cart-calculator.component.html',
  styleUrls: ['./cart-calculator.component.scss']
})
export class CartCalculatorComponent implements OnInit {
  totalValue = 0;
  products: any;

  constructor(
    private cartService: CartService,
  ) { }

  ngOnInit() {
    this.cartService.items$.subscribe(i => this.products = i);
    setTimeout(this.calculateTotalPrice(), 3000);
  }

  calculateTotalPrice() {
    this.totalValue = 0;
    this.products.forEach(product => {
      console.log(product)
      this.totalValue += product.base_price;
    });
  }
}
