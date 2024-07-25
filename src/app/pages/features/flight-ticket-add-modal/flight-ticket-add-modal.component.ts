import {Component, Inject, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import EventEmitter from "events";
import {TicketService} from "../../services/ticket.service";
import {NgForOf} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Ticket} from "../../interfaces/flight-ticket.interface";
import ShortUniqueId from 'short-uuid';


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
  airports: { code: string, name: string }[] = [
    { code: 'JFK', name: 'John F. Kennedy International Airport' },
    { code: 'LAX', name: 'Los Angeles International Airport' },
    { code: 'ORD', name: "O'Hare International Airport" },
    { code: 'DFW', name: 'Dallas/Fort Worth International Airport' },
    { code: 'DEN', name: 'Denver International Airport' },
    { code: 'SFO', name: 'San Francisco International Airport' },
    { code: 'ATL', name: 'Hartsfield-Jackson Atlanta International Airport' },
    { code: 'MIA', name: 'Miami International Airport' },
    { code: 'SEA', name: 'Seattle-Tacoma International Airport' },
    { code: 'LAS', name: 'McCarran International Airport' }
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
      ticket_type: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      seat_number: ['', Validators.required],
      from_date: ['', Validators.required],
      to_date: ['', Validators.required]
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.ticketForm.valid) {
      const newTicket: Ticket = this.ticketForm.value;
      newTicket.id = ShortUniqueId().generate();
      newTicket.ticket_type_id = `${newTicket.id}_${newTicket.ticket_type}`;
      this.ticketService.add(newTicket).then(() => {
        this.snackBar.open('Ticket created successfully!', '', {
          duration: 2000,
          panelClass:  ['success-snackbar'],
          verticalPosition: 'top'
        });
        this.ticketForm.reset();
      }).catch((error: any) => {
        this.snackBar.open('Duplicate ticket exists!', '', {
          duration: 2000,
          panelClass:  ['error-snackbar'],
          verticalPosition: 'top'
        });
      });
    }
  }
}
