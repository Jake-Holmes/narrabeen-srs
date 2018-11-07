import { Component, OnInit, Input } from '@angular/core';
import { Table } from '../table';
import { TableService } from '../table.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tablemanagement-create',
  templateUrl: './tablemanagement-create.component.html',
  styleUrls: ['./tablemanagement-create.component.scss']
})
export class TablemanagementCreateComponent implements OnInit {

  @Input("table") inputModel: Table;
  model: Table = new Table();
  preloaded = false;

  constructor(private tableService: TableService, private route: ActivatedRoute, private router: Router) { }

  async ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id) {
      const response = await this.tableService.getTable(id);
      console.log(response);
      if (response instanceof Table) {
        this.model = response;
        this.preloaded = true;
        console.log("preloaded from server", this.model);
      }
      else {
        this.model = new Table();
        console.log("Unknown Table", this.model);
      }
    }
    else if (this.inputModel !== undefined) {
      this.model = this.inputModel;
    }
    else {
      this.model = new Table();
      this.preloaded = false;
      console.log("Creating new instance of Table", this.model);
    }
  }

  async submitTable() {
    console.log(this.model);
    let response;
    if (this.preloaded) {
      response = await this.tableService.editTable(this.model);
    }
    else {
      response = await this.tableService.createTable(this.model);
    }
    console.log(response);
    this.router.navigateByUrl('/tablemanagement')
  }

}
