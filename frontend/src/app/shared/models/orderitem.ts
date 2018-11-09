import { MenuItem } from './menuitem';

export class OrderItem {
    date_created: string;
    date_modified: string;
    id: number;
    menu_item: MenuItem;
    menu_item_id: number;
    order_id: number;
    price: number;
    slot: number;
    status: string;
    ionicNamedColor: string;
    cardColor: string;
    typeColor: string;
    timeFormatted: String;
    buttonStatus: string;
}