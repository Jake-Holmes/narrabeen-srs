import { Table } from "./table"
// export class RTable {
//     id?: number;
//     table_number: number;
// }

// export class Table2 implements RTable {
//     public id?: number;
//     public table_number: number;

//     constructor(table?: RTable) {
//     Object.assign(this, table);
//     }

// }
export class IDateObj {
    //date: string;
    tablelist: MyTable[];
}

export class DateObj implements IDateObj {
    //public date: string;
    public tablelist: MyTable[];

    constructor(tablelist: MyTable[]){
        // Object.assign(this, this.tablelist)
        //this.date = date;
        this.tablelist = tablelist;
    }
}

export class MyITable {
    //table: number;
    timelist: TimeObj[];
}

export class MyTable implements MyITable {
    //public table: number;
    public timelist: TimeObj[];

    constructor(timelist: TimeObj[]){
        //this.table = table;
        this.timelist = timelist;
    }
}

export class ITimeObj{
    time: string;
    reserved: boolean;
}

export class TimeObj implements ITimeObj{
    public time: string;
    public reserved: boolean;

    constructor(time:string){
        this.time = time;
        this.reserved = false;
    }
}

export class IReservations {
    id?: number;
    table_id: number;
    customer_id: number;
    start_time: string;
    end_time: string;
    duration: number;
    table?: any[];
}

export class Reservations implements IReservations{
    public id?: number;
    public table_id: number;
    public customer_id: number;
    public start_time: string;
    public end_time: string;
    public duration: number;
    public table?: any[];

    constructor(reservation: IReservations)
    {
        Object.assign(this, reservation);
    }
}

export class ICustomer {
    id?: number;
    phone: string;
    firstname: string;
    lastname: string;
    reservations?: any[]
}

export class Customer implements ICustomer{
    public id?: number;
    public phone: string;
    public firstname: string;
    public lastname: string;
    reservations?: any[]

    constructor(customer: ICustomer){
        Object.assign(this, customer)
    }
}