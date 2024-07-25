import {Component, Inject, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TicketService} from "../../services/ticket.service";
import ShortUniqueId from 'short-uuid';
import {NgForOf} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";
import {catchError} from "rxjs/operators";
import {of} from "rxjs";
import {Ticket} from "../../interfaces/flight-ticket.interface";


@Component({
  selector: 'app-flight-ticket-add-modal',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatIcon,
    MatIconButton,
    ReactiveFormsModule,
    MatDialogContent,
    NgForOf

  ],
  templateUrl: './flight-ticket-add-modal.component.html',
  styleUrl: './flight-ticket-add-modal.component.scss'
})
export class FlightTicketAddModalComponent {
  ticketTypes: string[] = ['Economy', 'Business', 'First Class'];
  initialEconomyPrice: number | undefined;
  airports: { code: string, name: string }[] = [
    {code: 'JFK', name: 'John F. Kennedy International Airport'},
    {code: 'LAX', name: 'Los Angeles International Airport'},
    {code: 'ORD', name: "O'Hare International Airport"},
    {code: 'DFW', name: 'Dallas/Fort Worth International Airport'},
    {code: 'DEN', name: 'Denver International Airport'},
    {code: 'SFO', name: 'San Francisco International Airport'},
    {code: 'ATL', name: 'Hartsfield-Jackson Atlanta International Airport'},
    {code: 'MIA', name: 'Miami International Airport'},
    {code: 'SEA', name: 'Seattle-Tacoma International Airport'},
    {code: 'LAS', name: 'McCarran International Airport'}
  ];
  ticketForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<FlightTicketAddModalComponent>,
    private ticketService: TicketService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.ticketForm = this.fb.group({
      inbound: ['', Validators.required],
      outbound: ['', Validators.required],
      ticket_type: ['Economy', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      seat_number: ['', Validators.required],
      from_date: ['', Validators.required],
      to_date: ['', Validators.required]
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  onAirportChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    console.log('Selected airport code:', selectedValue);
    this.initialEconomyPrice = Math.floor(Math.random() * 51) + 50 // Generates a random price between 50 and 100
    this.ticketForm.patchValue({
      price: this.initialEconomyPrice
    });
  }

  onTicketTypeChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    console.log('Selected ticket type:', selectedValue);
    let newPrice = this.initialEconomyPrice;
    if (selectedValue === 'Business') newPrice = this.initialEconomyPrice as number * 1.2;
    if (selectedValue === 'First Class') newPrice = this.initialEconomyPrice as number * 1.5;
    this.ticketForm.patchValue({
      price: newPrice
    });
  }

  onSubmit(): void {
    if (this.ticketForm.valid) {
      const newTicket: Ticket = this.ticketForm.value;
      newTicket.id = (ShortUniqueId().generate()).slice(0,5);
      newTicket.ticket_type_id = `${newTicket.id}_${newTicket.ticket_type}`;
      newTicket.created_at = new Date();

      this.ticketService.add(newTicket).pipe(
        catchError(error => {
          this.snackBar.open('This ticket is duplicated!', '', {
            duration: 2000,
            panelClass: ['error-snackbar'],
            verticalPosition: 'top'
          });
          return of(null);
        })
      ).subscribe(result => {
        if (result !== null) {
          this.snackBar.open('Ticket created successfully!', '', {
            duration: 2000,
            panelClass: ['success-snackbar'],
            verticalPosition: 'top'
          });
          this.ticketForm.reset();
        }
      });
    }
  }
}
