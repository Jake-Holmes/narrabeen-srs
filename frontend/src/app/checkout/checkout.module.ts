import { CheckoutRoutingModule } from "./checkout.routing";
import { SharedModule } from "./../shared/shared.module";
import { CheckoutNavbarComponent } from "./checkout-navbar/checkout-navbar.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CheckoutComponent } from "./checkout.component";
import { BillingDetailsComponent } from './billing-details/billing-details.component';
import { ResultComponent } from './result/result.component';

@NgModule({
  imports: [CommonModule, SharedModule, CheckoutRoutingModule],
  declarations: [
    CheckoutComponent,
    CheckoutNavbarComponent,
    BillingDetailsComponent,
    ResultComponent
  ],
  exports: [CheckoutComponent]
})
export class CheckoutModule {}
