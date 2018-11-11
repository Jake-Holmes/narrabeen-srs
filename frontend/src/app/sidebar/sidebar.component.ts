import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  private privilaged: Boolean;

  private privilagedUrl: string[];

  private unprivilagedUrl: string[];

  private noToolBarUrl: string[];

  constructor(
    private router: Router,
  ) {
    //To display correct poolbar icons, you need to add the router link the these arrays. If its a page that does not require permissions, put the url into this.unprivilagedUrl.
    //If the page appears after the user has logged in either as staff or admin, put your router link in privilagedUrl.
    //If your page does not have a toolbar, put your link in noToolBarUrl.
    //If your page is too hard to put in, this module is specifically designed so that AS LONG AS THE PREVIOUS PAGE THE USER WAS ON HAS THE CORRECT TOOLBAR, the correct toolbar will show in the page.
    //Howevr like vaccines and herd immunity. if you can easily put your router link in, put it in.

    this.unprivilagedUrl=['']
    this.privilagedUrl=['/kitchen-view', '/staffHome', '/tablemanagement', '/tableManagement-create', '/kitchen-view', '/checkout']
    this.noToolBarUrl=['/tableLogin', '/staffLogin', '/tableLanding']
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
    if (this.noToolBarUrl.indexOf(this.router.url) !== -1) {  //first check if toolbar is displayed.
      return false;
    }
    if (this.setPrivilages(this.privilagedUrl, this.router.url)) { //if toolbar is displayed check for privilages then return false.
      this.privilaged = true;
      return true;
    } else if (this.setPrivilages(this.unprivilagedUrl, this.router.url)){
      this.privilaged = false;
      return true;
    } else {
      return true;
    }
  }

  private setPrivilages(array: string[], url:string) {
    if (array.indexOf(url) !== -1) {
      return true;
    } else {
      return false;
    }
  }

  public isNotPrivilaged() {
    return !this.privilaged;
  }

  public isPrivilaged() {
    return this.privilaged;
  }

}
