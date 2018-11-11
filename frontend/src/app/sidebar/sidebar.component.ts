import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  sidebar = {
    buttons: [
      { link: '', icon: 'supervised_user_circle' },
      { link: 'tablemanagement', icon: 'table_chart' },
      { link: 'kitchen-view', icon: 'table_chart' },
      { link: 'shopping-cart', icon: 'shopping_cart' },
    ]
  };

}
