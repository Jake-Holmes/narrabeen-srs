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
  sortedTables: Table[] = [];
  constructor(private tableService: TableService) { }

  async ngOnInit() {
    this.tables = await this.tableService.getAllTables();

    this.sortedTables = this.tables.slice(0);  
    this.sortedTables.sort((leftSide, rightSide): number => {
      if (leftSide.table_number < rightSide.table_number) return -1;
      if (leftSide.table_number > rightSide.table_number) return 1;
      return 0;
    });
    console.log(this.tables);
    console.log(this.sortedTables);
  }

}
