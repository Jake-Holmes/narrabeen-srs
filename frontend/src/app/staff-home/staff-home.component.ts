import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staff-home',
  templateUrl: './staff-home.component.html',
  styleUrls: ['./staff-home.component.scss']
})
export class StaffHomeComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.authGuard();
  }

  private async authGuard() {
    if (!await this.authService.authguard()) {
      this.router.navigate(['/staffLogin'])
    }
    return true;
  }
}
