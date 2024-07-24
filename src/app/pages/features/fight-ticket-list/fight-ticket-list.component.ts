import {Component, OnInit} from '@angular/core';
import {CommonModule, DatePipe} from "@angular/common";
import {RouterLink, RouterOutlet} from "@angular/router";
import {MdbCheckboxModule} from "mdb-angular-ui-kit/checkbox";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Ticket} from "../../interfaces/flight-ticket.interface";
import {FlightTicketAddModalComponent} from "../flight-ticket-add-modal/flight-ticket-add-modal.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-fight-ticket-list',
  standalone: true,
  imports: [
    DatePipe,
    CommonModule,
    RouterOutlet,
    MdbCheckboxModule,
    ReactiveFormsModule,
    RouterLink,
    FormsModule,
  ],
  templateUrl: './fight-ticket-list.component.html',
  styleUrl: './fight-ticket-list.component.scss'
})
export class FightTicketListComponent implements OnInit {

  tickets: Ticket[] = [
    {
      id: 1,
      inbound: 'New York',
      outbound: 'Los Angeles',
      ticket_type: 'Economy',
      ticket_type_id: '1-Economy',
      price: 300,
      from_date: new Date('2023-07-01'),
      to_date: new Date('2023-07-07'),
      seat_number: '12A'
    },
    {
      id: 2,
      inbound: 'London',
      outbound: 'Paris',
      ticket_type: 'Business',
      ticket_type_id: '2-Business',
      price: 600,
      from_date: new Date('2023-07-10'),
      to_date: new Date('2023-07-15'),
      seat_number: '3C'
    },
    {
      id: 3,
      inbound: 'Tokyo',
      outbound: 'Osaka',
      ticket_type: 'First Class',
      ticket_type_id: '3-FirstClass',
      price: 1000,
      from_date: new Date('2023-08-01'),
      to_date: new Date('2023-08-07'),
      seat_number: '1A'
    },
    {
      id: 4,
      inbound: 'Berlin',
      outbound: 'Munich',
      ticket_type: 'Economy',
      ticket_type_id: '4-Economy',
      price: 200,
      from_date: new Date('2023-09-01'),
      to_date: new Date('2023-09-07'),
      seat_number: '22B'
    },
    {
      id: 5,
      inbound: 'Sydney',
      outbound: 'Melbourne',
      ticket_type: 'Business',
      ticket_type_id: '5-Business',
      price: 500,
      from_date: new Date('2023-10-01'),
      to_date: new Date('2023-10-07'),
      seat_number: '14C'
    },
    {
      id: 6,
      inbound: 'Moscow',
      outbound: 'Saint Petersburg',
      ticket_type: 'Economy',
      ticket_type_id: '6-Economy',
      price: 150,
      from_date: new Date('2023-11-01'),
      to_date: new Date('2023-11-07'),
      seat_number: '17D'
    },
    {
      id: 7,
      inbound: 'Toronto',
      outbound: 'Vancouver',
      ticket_type: 'Business',
      ticket_type_id: '7-Business',
      price: 700,
      from_date: new Date('2023-12-01'),
      to_date: new Date('2023-12-07'),
      seat_number: '9E'
    },
    {
      id: 8,
      inbound: 'Dubai',
      outbound: 'Abu Dhabi',
      ticket_type: 'First Class',
      ticket_type_id: '8-FirstClass',
      price: 1200,
      from_date: new Date('2024-01-01'),
      to_date: new Date('2024-01-07'),
      seat_number: '3F'
    },
    {
      id: 9,
      inbound: 'Beijing',
      outbound: 'Shanghai',
      ticket_type: 'Economy',
      ticket_type_id: '9-Economy',
      price: 250,
      from_date: new Date('2024-02-01'),
      to_date: new Date('2024-02-07'),
      seat_number: '10G'
    },
    {
      id: 10,
      inbound: 'San Francisco',
      outbound: 'Las Vegas',
      ticket_type: 'Business',
      ticket_type_id: '10-Business',
      price: 450,
      from_date: new Date('2024-03-01'),
      to_date: new Date('2024-03-07'),
      seat_number: '11H'
    },
    {
      id: 11,
      inbound: 'Madrid',
      outbound: 'Barcelona',
      ticket_type: 'Economy',
      ticket_type_id: '11-Economy',
      price: 180,
      from_date: new Date('2024-04-01'),
      to_date: new Date('2024-04-07'),
      seat_number: '20I'
    },
    {
      id: 12,
      inbound: 'Rome',
      outbound: 'Milan',
      ticket_type: 'Business',
      ticket_type_id: '12-Business',
      price: 380,
      from_date: new Date('2024-05-01'),
      to_date: new Date('2024-05-07'),
      seat_number: '8J'
    },
    {
      id: 13,
      inbound: 'Buenos Aires',
      outbound: 'Santiago',
      ticket_type: 'First Class',
      ticket_type_id: '13-FirstClass',
      price: 900,
      from_date: new Date('2024-06-01'),
      to_date: new Date('2024-06-07'),
      seat_number: '4K'
    },
    {
      id: 14,
      inbound: 'Johannesburg',
      outbound: 'Cape Town',
      ticket_type: 'Economy',
      ticket_type_id: '14-Economy',
      price: 300,
      from_date: new Date('2024-07-01'),
      to_date: new Date('2024-07-07'),
      seat_number: '5L'
    },
    {
      id: 15,
      inbound: 'Delhi',
      outbound: 'Mumbai',
      ticket_type: 'Business',
      ticket_type_id: '15-Business',
      price: 550,
      from_date: new Date('2024-08-01'),
      to_date: new Date('2024-08-07'),
      seat_number: '7M'
    }
  ];


  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {

  }

  addTicket(): void {
    const dialogRef = this.dialog.open(FlightTicketAddModalComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe((result: Ticket) => {
      if (result) {
        this.tickets.push(result);
      }
    });
  }
}
