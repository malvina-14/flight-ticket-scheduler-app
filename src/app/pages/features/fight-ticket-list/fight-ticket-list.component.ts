import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from "@angular/common";
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import { MdbCheckboxModule } from "mdb-angular-ui-kit/checkbox";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "../../../auth/services/auth.service";
import { MatDialog } from "@angular/material/dialog";
import { FlightTicketViewModalComponent } from "../flight-ticket-view-modal/flight-ticket-view-modal.component";
import { FlightTicketAddModalComponent } from "../flight-ticket-add-modal/flight-ticket-add-modal.component";
import { TicketService } from "../../services/ticket.service";
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import {Ticket} from "../../interfaces/flight-ticket.interface";

@Component({
  selector: 'app-fight-ticket-list',
  standalone: true,
  imports: [
    DatePipe,
    CommonModule, RouterOutlet, MdbCheckboxModule, ReactiveFormsModule, RouterLink, FormsModule
  ],
  templateUrl: './fight-ticket-list.component.html',
  styleUrls: ['./fight-ticket-list.component.scss']
})
export class FightTicketListComponent implements OnInit {
  userRole: string = 'user';

  tickets$: Observable<Ticket[]> = of([]);
  filteredTickets$: Observable<Ticket[]> = of([]);
  searchTerm$ = new BehaviorSubject<string>('');
  selectedType$ = new BehaviorSubject<string>('All');
  ticketTypes: string[] = ['All', 'Economy', 'Business', 'First Class'];

  constructor(
    private router: Router,
    private authService: AuthService,
    public dialog: MatDialog,
    private ticketService: TicketService
  ) { }

  ngOnInit(): void {
    const user = this.authService.getUser();
    if (Object.keys(user).length) {
      this.userRole = user.role;
      this.tickets$ = this.getTickets();
      this.filteredTickets$ = this.getFilteredTickets();
    } else {
      this.authService.logout();
    }
  }

  onTicketTypeChange(event: Event): void {
    const selectedType = (event.target as HTMLSelectElement).value;
    this.selectedType$.next(selectedType);
  }

  searchTickets(event: Event): void {
    const term = (event.target as HTMLInputElement).value;
    this.searchTerm$.next(term);
  }

  getTickets(): Observable<Ticket[]> {
    return this.selectedType$.pipe(
      switchMap(selectedType => this.ticketService.tickets(selectedType))
    );
  }

  getFilteredTickets(): Observable<Ticket[]> {
    return combineLatest([
      this.tickets$.pipe(startWith([])),
      this.searchTerm$.pipe(startWith(''))
    ]).pipe(
      map(([tickets, searchTerm]) => {
        return tickets.filter(ticket =>
          ticket.inbound.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ticket.outbound.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ticket.ticket_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ticket.ticket_type_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ticket.seat_number.toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
    );
  }

  addTicket(): void {
    const dialogRef = this.dialog.open(FlightTicketAddModalComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tickets$ = combineLatest([this.tickets$]).pipe(
          map(([tickets]) => [...tickets, result])
        );
      }
    });
  }

  viewTicket(ticket: Ticket): void {
    this.dialog.open(FlightTicketViewModalComponent, {
      width: '600px',
      data: { ticket },
    });
  }
}
