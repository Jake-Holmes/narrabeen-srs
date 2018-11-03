import { OrderItem } from "./shared/models/orderitem";

export class ITable {
    id: number;
    table_number: number;
    seats: number;
    qr_code: string;
    passcode: string;
    status: boolean;
    order: OrderItem;
}

export class Table implements ITable {
    public id: number;
    public table_number: number;
    public seats: number;
    public qr_code: string;
    public passcode: string; 
    public status: boolean;
    order: OrderItem;

    constructor(table?: ITable) {
        if (table) {
            console.log(table);
            Object.assign(this, table);
        }
    }
}
