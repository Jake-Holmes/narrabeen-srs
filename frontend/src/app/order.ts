
export class OrderItem{
            date_created: string;
            date_modified: string;
            id: number;
            menu_item: {
                active: boolean;
                base_price: number;
                date_created: string;
                date_modified: string;
                description: string;
                id: number;
                image: string;
                menu_item_type: string;
                name: string;
            }
            menu_item_id: number;
            order_id: number;
            price: number;
            slot: number;
            status: string;
}