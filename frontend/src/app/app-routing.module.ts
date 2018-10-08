import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { MenuItemDetailsComponent } from './menu-item-details/menu-item-details.component';
import { TablemanagementComponent } from "./tablemanagement/tablemanagement.component";
import { KitchenViewComponent } from './kitchen-view/kitchen-view.component';

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
    path: 'kitchen-view',
    component: KitchenViewComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
