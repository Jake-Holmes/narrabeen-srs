import { Component, OnInit } from '@angular/core';
import { TableService } from '../table.service';
import { Table } from '../table';

@Component({
  selector: 'app-tablemanagement',
  templateUrl: './tablemanagement.component.html',
  styleUrls: ['./tablemanagement.component.scss']
})
export class TablemanagementComponent implements OnInit {

  tables: Table[] = [];

  constructor(private tableService: TableService) { }

  async ngOnInit() {
    this.tables = await this.tableService.getAllTables();
    console.log(this.tables);
  }

}
