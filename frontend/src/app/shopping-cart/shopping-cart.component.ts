import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MenuItem } from '../shared/models/menuitem';
import { CartService } from '../cart.service';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  cartProducts: MenuItem[] = [];
  showDataNotFound = true;

  // Not Found Message
  messageTitle = "No Products Found in Cart";
  messageDescription = "Please, Add Products to Cart";

  constructor(
    private cartService: CartService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getCartProduct();
  }

  GoBack(): void {
    this.location.back();
  }

  consoleMe() {
    console.log(this.cartProducts);
  }

  removeCartProduct(product: MenuItem) {
    this.cartService.removeLocalCartProduct(product);

    // Recalling
    this.getCartProduct();
  }

  getCartProduct() {
    this.cartProducts = this.cartService.getLocalCartProducts();
  }
}
