import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Ticket} from "../interfaces/flight-ticket.interface";

@Injectable({
    providedIn: 'root'
})
export class TicketService {
    private ticketsCollection: AngularFirestoreCollection<Ticket>;

    constructor(private firestore: AngularFirestore,  private snackBar: MatSnackBar,) {
        this.ticketsCollection = this.firestore.collection('tickets');
    }



    tickets(selectedType?: any): Observable<Ticket[]> {
        let collectionRef = this.firestore.collection('tickets') as any;
        if (selectedType && selectedType !== "All") {
                collectionRef = this.firestore.collection('tickets', ref =>
                    ref.where('ticket_type', '==', selectedType)
                );
        }

        return collectionRef.valueChanges();
    }

  add(ticket: Ticket): Promise<void> {
    return this.isDuplicated(ticket).then(isDup => {
      if (isDup) {
        console.error('Error adding ticket: Duplicate ticket exists');
        return Promise.reject('Duplicate ticket exists');
      } else {
        return this.ticketsCollection.add(ticket)
          .then((docRef) => console.log('Ticket added successfully', docRef))
          .catch((error) => console.error('Error adding ticket: ', error));
      }
    });
  }
  isDuplicated(ticket: Ticket): Promise<boolean> {
    return this.ticketsCollection.ref
      .where('inbound', '==', ticket.inbound)
      .where('outbound', '==', ticket.outbound)
      .where('from_date', '==', ticket.from_date)
      .where('to_date', '==', ticket.to_date)
      .where('seat_number', '==', ticket.seat_number)
      .get()
      .then(querySnapshot => {
        return !querySnapshot.empty;
      })
      .catch(error => {
        console.error('Error checking for duplicate ticket: ', error);
        return false;
      });
  }
}
