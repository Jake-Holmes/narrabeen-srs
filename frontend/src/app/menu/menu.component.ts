import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menu$: Object;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getMenu().subscribe(
      data => this.menu$ = data 
    );
  }

}
