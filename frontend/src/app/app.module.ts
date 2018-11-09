import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MenuComponent } from './menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule} from '@angular/material/card';
import { MatGridListModule} from '@angular/material/grid-list';
import { MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule} from "@angular/forms";
import { MenuItemDetailsComponent } from './menu-item-details/menu-item-details.component';
import { TablemanagementComponent } from './tablemanagement/tablemanagement.component';
import { KitchenViewComponent } from './kitchen-view/kitchen-view.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { NoProductsFoundComponent } from './shared/no-products-found/no-products-found.component';
import { CartCalculatorComponent } from './cart-calculator/cart-calculator.component';

import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CheckoutComponent } from './checkout/checkout.component';
import { StaffLoginComponent } from './staff-login/staff-login.component';
import { TablemanagementCreateComponent } from './tablemanagement-create/tablemanagement-create.component';
import { StaffHomeComponent } from './staff-home/staff-home.component';
import { AuthService } from './auth/auth.service';
import { TableLoginComponent } from './table-login/table-login.component';
import { TableQrComponent } from './table-qr/table-qr.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MenuComponent,
    MenuItemDetailsComponent,
    TablemanagementComponent,
    KitchenViewComponent,
    ShoppingCartComponent,
    NoProductsFoundComponent,
    CartCalculatorComponent,
    CheckoutComponent,
    StaffLoginComponent,
    TablemanagementCreateComponent,
    StaffHomeComponent,
    TableLoginComponent,
    TableQrComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
