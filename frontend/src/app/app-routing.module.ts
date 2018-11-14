import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { MenuItemDetailsComponent } from './menu-item-details/menu-item-details.component';
import { TablemanagementComponent } from './tablemanagement/tablemanagement.component';
import { KitchenViewComponent } from './kitchen-view/kitchen-view.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { StaffLoginComponent } from './staff-login/staff-login.component';
import { WaiterViewComponent } from './waiter-view/waiter-view.component';

import { CheckoutComponent } from './checkout/checkout.component';
import { BillingDetailsComponent } from './checkout/billing-details/billing-details.component';
import { ResultComponent } from './checkout/result/result.component';


import { NoAccessComponent } from "./shared/no-access/no-access.component";
import { PageNotFoundComponent } from "./shared/page-not-found/page-not-found.component";

import { TablemanagementCreateComponent } from './tablemanagement-create/tablemanagement-create.component';
import { StaffHomeComponent } from './staff-home/staff-home.component';
import { TableLoginComponent } from './table-login/table-login.component';
import { TableQrComponent } from './table-qr/table-qr.component';
import { ReservationsComponent } from "./reservations/reservations.component"


import { MenuItemAdminComponent } from './menu-item-admin/menu-item-admin.component';
import { MenuAdminComponent } from './menu-admin/menu-admin.component';

const routes: Routes = [
  {
    path: 'menu',
    component: MenuComponent
  },
  {
    path: 'menu-item/:id',
    component: MenuItemDetailsComponent
  },
  {
    path: 'menu-admin',
    component: MenuAdminComponent
  },
  {
    path: 'menu-item-create-edit',
    component: MenuItemAdminComponent
  },
  {
    path: 'tablemanagement',
    component: TablemanagementComponent
  },
  {
    path: 'tablemanagement-create',
    component: TablemanagementCreateComponent
  },
  {
    path: 'kitchen-view',
    component: KitchenViewComponent
  },
  {
    path: 'shopping-cart',
    component: ShoppingCartComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'checkout/billing-details',
    component: BillingDetailsComponent
  },
  {
    path: "checkout/result",
    component: ResultComponent
  },
  // Routes for staff and administrator pages.
  {
    path: 'staffLogin',
    component: StaffLoginComponent
  },
  // Routes for staff/administrator home.
  {
    path: 'staffHome',
    component: StaffHomeComponent
  },

  // Route for table login.
  {
    path: 'tableLogin',
    component: TableLoginComponent
  },
  //Route for reservation
  {
    path: 'reservations',
    component: ReservationsComponent
  },
  // Route for table landing page with qr code.
  {
    path: 'tableLanding',
    component: TableQrComponent
  },
  //Route for waiter order dish management page.
  {
    path: 'waiter-view',
    component: WaiterViewComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false, useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
