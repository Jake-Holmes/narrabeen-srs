import { Component, OnInit } from '@angular/core';
import { Product } from "../../shared/models/product";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  checkoutProducts: Product[];

  totalPrice = 0;

  constructor() { 
    document.getElementById("shippingTab").style.display = "none";
    document.getElementById("billingTab").style.display = "none";
    document.getElementById("resultTab").style.display = "none";

    const products = this.getLocalCartProducts();
    this.checkoutProducts = products;

    products.forEach(product => {
      this.totalPrice += product.base_price;
    });

  }

  ngOnInit() {
  }

  getLocalCartProducts(): Product[] {
    const products: Product[] =
      JSON.parse(localStorage.getItem("avct_item")) || [];

    return products;
  }

}
