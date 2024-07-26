import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, from, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { MatSnackBar } from "@angular/material/snack-bar";
import {Ticket} from "../interfaces/flight-ticket.interface";

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private ticketsCollection: AngularFirestoreCollection<Ticket>;

  constructor(private firestore: AngularFirestore, private snackBar: MatSnackBar) {
    this.ticketsCollection = this.firestore.collection('tickets');
  }

  add(ticket: Ticket): Observable<void> {
    return this.isDuplicated(ticket).pipe(
      switchMap(isDup => {
        if (isDup) {
          this.snackBar.open('Error adding ticket: Duplicate ticket exists', 'Close', { duration: 3000 });
          return throwError('Ticket already exists!');
        } else {
          return from(this.ticketsCollection.add(ticket)).pipe(
            map(() => {
              this.snackBar.open('Ticket added successfully', 'Close', { duration: 3000 });
            }),
            catchError(error => {
              console.error('Error adding ticket: ', error);
              this.snackBar.open('Error adding ticket', 'Close', { duration: 3000 });
              return throwError(error);
            })
          );
        }
      }),
      catchError(error => {
        this.snackBar.open('Error adding the ticket!', '', {
          duration: 2000,
          panelClass: ['error-snackbar'],
          verticalPosition: 'top'
        });
        return throwError(error);
      })
    );
  }

  isDuplicated(ticket: Ticket): Observable<boolean> {
    return from(this.ticketsCollection.ref
      .where('inbound', '==', ticket.inbound)
      .where('outbound', '==', ticket.outbound)
      .where('from_date', '==', ticket.from_date)
      .where('to_date', '==', ticket.to_date)
      .where('seat_number', '==', ticket.seat_number)
      .get()).pipe(
      map(querySnapshot => !querySnapshot.empty),
      catchError(error => {
        console.error('Error checking for duplicate ticket: ', error);
        return throwError(error);
      })
    );
  }

  tickets(selectedType?: string): Observable<Ticket[]> {
    let collectionRef: AngularFirestoreCollection<Ticket>;

    if (selectedType && selectedType !== "All") {
      collectionRef = this.firestore.collection<Ticket>('tickets', ref =>
        ref.where('ticket_type', '==', selectedType).orderBy('created_at', 'desc')
      );
    } else {
      collectionRef = this.firestore.collection<Ticket>('tickets', ref =>
        ref.orderBy('created_at', 'desc')
      );
    }

    return collectionRef.valueChanges();
  }
}
