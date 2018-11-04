import { Component, OnInit } from '@angular/core';
import { Table } from '../table';
import { TableService } from '../table.service';

@Component({
  selector: 'app-tablemanagement-create',
  templateUrl: './tablemanagement-create.component.html',
  styleUrls: ['./tablemanagement-create.component.scss']
})
export class TablemanagementCreateComponent implements OnInit {

  public model: Table;

  constructor(private tableService: TableService) { }

  ngOnInit() {
    this.model = new Table();
  }

  async submitTable() {
    console.log(this.model);
    const response = await this.tableService.createTable(this.model);
    console.log(response);
  }

}
