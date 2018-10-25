export class Table {
    constructor (
        public id: number,
        public table_number: number,
        public seats: number,
        public qr_code: string,
        public passcode: string, 
        public status: boolean
    ) {  }
}
