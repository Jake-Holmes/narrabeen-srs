import { Component, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { Product } from "../shared/models/product";

@Component({
  selector: 'app-cart-calculator',
  templateUrl: './cart-calculator.component.html',
  styleUrls: ['./cart-calculator.component.scss']
})
export class CartCalculatorComponent implements OnInit {

  totalValue = 0;
  products: any;

  constructor() {
    this.products = [];
   }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("HELLO");
    const dataChanges: SimpleChange = changes.products;

    const products: Product[] = dataChanges.currentValue;
    this.totalValue = 0;
    products.forEach(product => {
      this.totalValue += product.base_price;
    });
  }

}
