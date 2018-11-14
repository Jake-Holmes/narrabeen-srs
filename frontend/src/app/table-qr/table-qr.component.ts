import { Component, OnInit } from '@angular/core';
import { TableAuthService } from '../auth/table-auth.service';

@Component({
  selector: 'app-table-qr',
  templateUrl: './table-qr.component.html',
  styleUrls: ['./table-qr.component.scss']
})
export class TableQrComponent implements OnInit {
  qrcode: string;
  constructor(
    private tableAuthService: TableAuthService,
  ) {
    this.qrcode = tableAuthService.returnQrUrl();
  }

  ngOnInit() {
  }
}
