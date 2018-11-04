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

  public async getAllTables(): Promise<Table[]> {
    const tables = await this.http.get<ITable[]>(this.API + "/table/all").toPromise();
    return tables.map(item => new Table(item));
  }

  public createTable(table: ITable): Promise<void> {
    return this.http.post<void>(this.API + "/table", table).toPromise();
  }
}
