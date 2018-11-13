import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Reservations, IReservations, ICustomer, Customer } from './reservation';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  
  private baseRoute = 'https://jakeholmes.me:5000/';
  //private baseRoute = 'http://localhost:5000/';  

  constructor(private http: HttpClient) { }
  
  public async getAllReservations(): Promise<Reservations[]>{
    const reservations = await this.http.get<IReservations[]>(this.baseRoute+"reservations/customer").toPromise();
    return reservations.map(item => new Reservations(item));
  }

  public async createReservation(mobNum: string, table: number, reservation: IReservations): Promise<Reservations>{
    const responseReservation: IReservations = await this.http.post<IReservations>(this.baseRoute+"reservations/customer?mobNum="+mobNum+"&table="+table, reservation).toPromise()
    return new Reservations(responseReservation);
  }

  public async getCustomer(mobNum: string): Promise<Customer>{
    const customers: ICustomer = await this.http.get<ICustomer>(this.baseRoute+"customer?mobNum="+mobNum).toPromise();
    return  new Customer(customers);
  }

  public async createCustomer(customer: ICustomer): Promise<Customer>{
    const responseCustomer: ICustomer = await this.http.post<ICustomer>(this.baseRoute+"customer", customer).toPromise();
    return new Customer(responseCustomer);
  }
}
