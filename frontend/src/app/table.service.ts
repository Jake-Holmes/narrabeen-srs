import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Table, ITable } from './table';
import { environment } from "./../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TableService {

  API: string = environment.prod_API;

  constructor(private http: HttpClient) { }

  public async getAllTables(): Promise<Table[]> {
    const tables = await this.http.get<ITable[]>(this.API + "/table/all").toPromise();
    return tables.map(item => new Table(item));
  }

  public async createTable(table: ITable): Promise<Table> {
    const responseTable: ITable = await this.http.post<ITable>(this.API + "/table", table).toPromise();
    return new Table(responseTable);
  }

  public async editTable(table: ITable): Promise<ITable> {
    const responseTable: ITable = await this.http.put<ITable>(this.API + "/table", table).toPromise();
    return new Table(responseTable);
  }
  
  public async getTable(id: number): Promise<Table | undefined> {
    const responseTable: ITable = await this.http.get<ITable>(this.API + "/table?id="+id).toPromise();
    console.log(responseTable);
    if (Object.keys(responseTable).length < 1)
      return undefined;
    else
      return new Table(responseTable);
  }
}
