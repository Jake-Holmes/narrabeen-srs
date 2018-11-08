import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { MenuItemDetailsComponent } from './menu-item-details/menu-item-details.component';
import { TablemanagementComponent } from "./tablemanagement/tablemanagement.component";
import { KitchenViewComponent } from './kitchen-view/kitchen-view.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { StaffLoginComponent} from './staff-login/staff-login.component';

import { CheckoutComponent } from './checkout/checkout.component';

import { NoAccessComponent } from "./shared/no-access/no-access.component";
import { PageNotFoundComponent } from "./shared/page-not-found/page-not-found.component";
import { TablemanagementCreateComponent } from './tablemanagement-create/tablemanagement-create.component';
import { StaffHomeComponent } from './staff-home/staff-home.component';



const routes: Routes = [
  {
    path: '',
    component: MenuComponent
  },
  {
    path: 'menu-item/:id',
    component: MenuItemDetailsComponent
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

  //Routes for staff and administrator pages.
  {
    path:'staffLogin',
    component: StaffLoginComponent
  },

  //Routes for staff/administrator home.
  {
    path:'staffHome',
    component: StaffHomeComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
