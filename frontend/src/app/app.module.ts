import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MenuComponent } from './menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import { MenuItemDetailsComponent } from './menu-item-details/menu-item-details.component';
import { TablemanagementComponent } from './tablemanagement/tablemanagement.component';
import { KitchenViewComponent } from './kitchen-view/kitchen-view.component';
import { MenuAdminComponent } from './menu-admin/menu-admin.component';
import { MenuItemAdminComponent } from './menu-item-admin/menu-item-admin.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { NoProductsFoundComponent } from './shared/no-products-found/no-products-found.component';
import { CartCalculatorComponent } from './cart-calculator/cart-calculator.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CheckoutComponent } from './checkout/checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MenuComponent,
    MenuItemDetailsComponent,
    TablemanagementComponent,
    KitchenViewComponent,
    MenuAdminComponent,
    MenuItemAdminComponent,
    ShoppingCartComponent,
    NoProductsFoundComponent,
    CartCalculatorComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
