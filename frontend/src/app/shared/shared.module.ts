import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// import { AppRoutingModule } from '../app-routing.module';
// import { AppComponent } from '../app.component';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
// import { OrderComponent } from './models/order/order.component';

// import { NoProductsFoundComponent } from "./no-products-found/no-products-found.component";
// import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
// import { NoAccessComponent } from './no-access/no-access.component';


@NgModule({
  declarations: [
    // AppComponent,
    // NoProductsFoundComponent,
    // PageNotFoundComponent,
    // NoAccessComponent
  OrderComponent],
  imports: [
    BrowserModule,
    // AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule
  ],
  exports: [
    // NoProductsFoundComponent,
    // NoAccessComponent,
    // PageNotFoundComponent
  ],
  providers: [],
  bootstrap: []
})
export class SharedModule { }
