import {Component, OnInit} from '@angular/core';
import {CommonModule, DatePipe} from "@angular/common";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {MdbCheckboxModule} from "mdb-angular-ui-kit/checkbox";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../../../auth/services/auth.service";
import {FlightTicketViewModalComponent} from "../flight-ticket-view-modal/flight-ticket-view-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {FlightTicketAddModalComponent} from "../flight-ticket-add-modal/flight-ticket-add-modal.component";
import {TicketService} from "../../services/ticket.service";
import {Ticket} from "../../interfaces/flight-ticket.interface";

@Component({
  selector: 'app-fight-ticket-list',
  standalone: true,
  imports: [
    DatePipe,
    CommonModule, RouterOutlet, MdbCheckboxModule, ReactiveFormsModule, RouterLink, FormsModule
  ],
  templateUrl: './fight-ticket-list.component.html',
  styleUrl: './fight-ticket-list.component.scss'
})
export class FightTicketListComponent implements OnInit{
  userRole: string = 'user';

  tickets: Ticket[] = [];
  filteredTickets: Ticket[] = [];
  searchTerm: string = '';
  selectedType: string = 'All';
  ticketTypes: string[] = ['All','Economy', 'Business', 'First Class'];

  constructor(private router: Router,private authService: AuthService,public dialog: MatDialog, private ticketService: TicketService) {}

  ngOnInit(): void {
    this.filteredTickets = this.tickets;
    const user = this.authService.getUser()
    if (Object.keys(user).length) {
      this.userRole = user.role;
      this.getTickets()
    } else {
      this.authService.logout()
    }

  }

  onTicketTypeChange(selectedType: string): void {
    this.getTickets()
  }

  getTickets(){
    this.ticketService.tickets(this.selectedType).subscribe(tickets => {
      this.tickets = tickets.map(ticket => ({
        ...ticket,

      }));
      this.filteredTickets = [...this.tickets]
    });
  }


  searchTickets(): void {
    this.filteredTickets = this.tickets.filter(ticket =>
      ticket.inbound.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      ticket.outbound.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      ticket.ticket_type.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      ticket.ticket_type_id.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      ticket.seat_number.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }


  addTicket(): void {
    const dialogRef = this.dialog.open(FlightTicketAddModalComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.filteredTickets.push(result);
      }
    });
  }
  viewTicket(ticket: any) {
    this.dialog.open(FlightTicketViewModalComponent, {
      width: '600px',
      data: { ticket },
    });
  }

}
