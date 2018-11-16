import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { Product } from "../shared/models/product";
import { MenuItem } from "../shared/models/menuitem";

@Component({
  selector: 'app-cart-calculator',
  templateUrl: './cart-calculator.component.html',
  styleUrls: ['./cart-calculator.component.scss']
})
export class CartCalculatorComponent implements OnInit, OnChanges {
  @Input() products: MenuItem[];

  totalValue = 0.0;

  constructor() { }

  ngOnInit() {
  }

  calculateTotalPrice() {
    this.totalValue = 0;
    this.products.forEach(product => {
      console.log(product)
      this.totalValue += product.base_price;
    });
    this.totalValue = +(this.totalValue.toFixed(2));
  }

  ngOnChanges(changes: any) {
    const dataChanges: SimpleChange = changes.products;

    const products: Product[] = dataChanges.currentValue;
    this.totalValue = 0;
    products.forEach(product => {
      this.totalValue += product.base_price;
    });
    this.totalValue = +(this.totalValue.toFixed(2));
  }
}
