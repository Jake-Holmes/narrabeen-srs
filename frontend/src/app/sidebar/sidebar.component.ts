import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  //Identifiers for each page. Tells site which type of page is currently displayed. Determiens which icons will be displayed on site.

  private staffPage: Boolean;

  private tablePage: Boolean;

  private sitePage: Boolean;

  //Stored string to be compared with current URLs. Contains all URLs, determines what toolbar is required for each page.

  private staffUrl: string[];

  private siteUrl: string[];

  private tableUrl: string[];

  private noToolBarUrl: string[];

  constructor(
    private router: Router,
  ) {
    //To display correct poolbar icons, you need to add the router link the these arrays. If its a page that does not require permissions, put the url into this.siteUrl.
    //If the page appears after the user has logged in either as staff or admin, put your router link in staffUrl.
    //If the page appears after the user has scanned the Table QR code put router link into tableUrl.
    //If your page does not have a toolbar, put your link in noToolBarUrl.
    //If your page is too hard to put in, this module is specifically designed so that AS LONG AS THE PREVIOUS PAGE THE USER WAS ON HAS THE CORRECT TOOLBAR, the correct toolbar will show in the page.
    //Howevr like vaccines and herd immunity. if you can easily put your router link in, put it in.
    //Module will match only the first characters of the URLs. That means if you have a site like: /menu/login or /menu?id=2, you can jsut put in /menu and the module will work.
  

    this.siteUrl = ['/']
    this.staffUrl = ['/kitchen-view', '/staffHome', '/tablemanagement', '/tableManagement-create', '/kitchen-view', '/checkout', '/waiter-view']
    this.tableUrl = []
    this.noToolBarUrl = ['/tableLogin', '/staffLogin', '/tableLanding']
  }

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

  public showToolbar(): Boolean {
    if (this.noToolBarUrl.indexOf(this.router.url) === 1 || this.noToolBarUrl.indexOf(this.router.url) === 0) {  //first check if toolbar is displayed.
      return false;
    }
    if (this.setPrivilages(this.staffUrl, this.router.url)) { //if toolbar is displayed check for privilages then return false.
      this.staffPage = true;
      this.tablePage = false;
      this.sitePage = false;
      return true;
    } else if (this.setPrivilages(this.siteUrl, this.router.url)) {
      this.staffPage = false;
      this.tablePage = false;
      this.sitePage = true;
      return true;
    } else if (this.setPrivilages(this.tableUrl, this.router.url)) {
      this.staffPage = false;
      this.tablePage = true;
      this.sitePage = false;
      return true;
    } else {
      return true;
    }
  }

  private setPrivilages(array: string[], url: string) {
    if (array.indexOf(url) == 1 || array.indexOf(url) == 0) {
      return true;
    } else {
      return false;
    }
  }

  public isStaff() {
    return this.staffPage;
  }

  public isTable() {
    return this.tablePage;
  }

  public isSite() {
    return this.sitePage;
  }

}
