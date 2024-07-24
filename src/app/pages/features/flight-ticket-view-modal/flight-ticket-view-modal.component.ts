import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {DatePipe} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-flight-ticket-view-modal',
  standalone: true,
  imports: [
    DatePipe,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatButton,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './flight-ticket-view-modal.component.html',
  styleUrl: './flight-ticket-view-modal.component.scss'
})
export class FlightTicketViewModalComponent {
  constructor(
      public dialogRef: MatDialogRef<FlightTicketViewModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { ticket: any }
  ) {}

  close(): void {
    this.dialogRef.close();
  }


}
