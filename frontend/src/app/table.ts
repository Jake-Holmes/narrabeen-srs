import { OrderItem } from "./shared/models/orderitem";

export class ITable {
    id?: number;
    table_number: number;
    seats: number;
    qr_code?: string;
    passcode: string;
    status: boolean;
    order?: OrderItem;
    reservations?: any[] //convert to reservations object once a class is created
}

export class Table implements ITable {
    public id?: number;
    public table_number: number;
    public seats: number;
    public qr_code?: string;
    public passcode: string; 
    public status: boolean;
    public order?: OrderItem;
    public reservations?: any[] //convert to reservations object once a class is created

    constructor(table?: ITable) {
        if (table) {
            console.log(table);
            Object.assign(this, table); //blind assign with no type checking is gonna make for fun times and amazing bugs..... if we really cared we could add some more checking here
        }
        else {
            this.table_number = 0;
            this.seats = 0;
            this.passcode = "0000"
            this.status = true;
        }
    }
}
