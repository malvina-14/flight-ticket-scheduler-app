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
}
