import {Component, OnInit} from '@angular/core';
import {CommonModule, DatePipe} from "@angular/common";
import {RouterLink, RouterOutlet} from "@angular/router";
import {MdbCheckboxModule} from "mdb-angular-ui-kit/checkbox";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Ticket} from "../../interfaces/flight-ticket.interface";
import {FlightTicketAddModalComponent} from "../flight-ticket-add-modal/flight-ticket-add-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {FlightTicketViewModalComponent} from "../flight-ticket-view-modal/flight-ticket-view-modal.component";
import {AuthService} from "../../../auth/services/auth.service";
import {TicketService} from "../../services/ticket.service";

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
  userRole: string = 'user';

  tickets: Ticket[] = [];

  constructor(public dialog: MatDialog,private authService: AuthService,private ticketService: TicketService) {
  }

  ngOnInit(): void {
    const user = this.authService.getUser()
    if (Object.keys(user).length) {
      this.userRole = user.role;
      this.getTickets()
    } else {
      this.authService.logout()
    }

  }
  getTickets(){
    this.ticketService.tickets().subscribe(tickets => {
      this.tickets = tickets.map(ticket => ({
        ...ticket,

      }));
      this.tickets = [...this.tickets]
      console.log('Tickets:', this.tickets);
    });
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

  viewTicket(ticket: any) {
    console.log('ticket', ticket)
    this.dialog.open(FlightTicketViewModalComponent, {
      width: '600px',
      data: {ticket},
    });
  }

}
