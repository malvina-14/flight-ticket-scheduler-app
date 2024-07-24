import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {close} from "fs";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

class AddTicketModalComponent {
}

@Component({
  selector: 'app-flight-ticket-add-modal',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatIcon,
    MatIconButton,
    ReactiveFormsModule,
    MatDialogContent
  ],
  templateUrl: './flight-ticket-add-modal.component.html',
  styleUrl: './flight-ticket-add-modal.component.scss'
})
export class FlightTicketAddModalComponent {



  ticketForm: FormGroup;

  constructor(
      private fb: FormBuilder,
      public dialogRef: MatDialogRef<AddTicketModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.ticketForm = this.fb.group({
      ticket_type_id: ['', Validators.required],
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
      this.dialogRef.close(this.ticketForm.value);
    }
  }
}
