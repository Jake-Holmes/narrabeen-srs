import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';


import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { MenuComponent } from './menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule} from '@angular/forms';
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
import { CheckoutNavbarComponent } from './checkout/checkout-navbar/checkout-navbar.component';
import { BillingDetailsComponent } from './checkout/billing-details/billing-details.component';
import { ResultComponent } from './checkout/result/result.component';
import { StaffLoginComponent } from './staff-login/staff-login.component';
import { TablemanagementCreateComponent } from './tablemanagement-create/tablemanagement-create.component';
import { StaffHomeComponent } from './staff-home/staff-home.component';
import { AuthService } from './auth/auth.service';
import { TableLoginComponent } from './table-login/table-login.component';
import { TableQrComponent } from './table-qr/table-qr.component';
import { MaterialComponentsModule } from './material-components.module';
import { ReservationsComponent } from './reservations/reservations.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    CheckoutNavbarComponent,
    PageNotFoundComponent,
    MenuComponent,
    MenuItemDetailsComponent,
    TablemanagementComponent,
    KitchenViewComponent,
    MenuAdminComponent,
    MenuItemAdminComponent,
    ShoppingCartComponent,
    NoProductsFoundComponent,
    CartCalculatorComponent,
    CheckoutComponent,
    BillingDetailsComponent,
    ResultComponent,
    StaffLoginComponent,
    TablemanagementCreateComponent,
    StaffHomeComponent,
    TableLoginComponent,
    TableQrComponent,
    ReservationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      timeOut: 1000,
      preventDuplicates: true
    })
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
