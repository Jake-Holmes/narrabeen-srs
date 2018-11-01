import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Table, ITable } from './table';
import { environment } from "./../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TableService {

  API: string = environment.API;

  constructor(private http: HttpClient) { }

  getAllTables(): Promise<Table[]> {
    return new Promise((resolve, reject) => {
      this.http.get<ITable[]>(this.API + "table/all").subscribe((data: ITable[]) => {
        resolve(data.map(item => new Table(item)))
      }, reject)
    })
  }
}
