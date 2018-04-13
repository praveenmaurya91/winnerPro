import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Invoice } from '../interfaces/invoice';

@Injectable()
export class TransactionService {

  invoiceCollection: AngularFirestoreCollection<Invoice>;
  invoices: Observable<Invoice[]>;
  invoiceDoc: AngularFirestoreDocument<Invoice>;

  constructor(public afs: AngularFirestore) {
    this.invoiceCollection = this.afs.collection('invoices', ref => ref.orderBy('number', 'asc'));
    this.invoices = this.invoiceCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Invoice;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }
  /**this function get the collection from the firebase */
  getItems() {
    this.invoiceCollection = this.afs.collection('invoices', ref => ref.orderBy('number', 'asc'));
    this.invoices = this.invoiceCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Invoice;
        data.id = a.payload.doc.id;
        return data;
      });
    });
    return this.invoices;
  }
  /**
   * function to add data into the collection
   * @param invoice
   */
  addItem(invoice: Invoice) {
    this.invoiceCollection.add(invoice);
  }
  /**
   * function to delete the data from the collection
   * @param invoice
   */
  deleteItem(invoice: Invoice) {
    this.invoiceDoc = this.afs.doc(`invoices/${invoice.id}`);
    this.invoiceDoc.delete();
  }
  /**
   * function to update the data
   * @param invoice
   */
  updateItem(invoice: Invoice) {
    this.invoiceDoc = this.afs.doc(`invoices/${invoice.id}`);
    this.invoiceDoc.update(invoice);
  }

}
