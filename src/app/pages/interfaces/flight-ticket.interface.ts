// ticket.model.ts
export interface Ticket {
    id: number;
    inbound: string;
    outbound: string;
    ticket_type: string;
    ticket_type_id: string;
    price: number;
    from_date: Date;
    to_date: Date;
    seat_number: string;
}
