import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Product } from '../interfaces/product';

@Injectable()
export class ListsService {

  productCollection: AngularFirestoreCollection<Product>;
  products: Observable<Product[]>;
  productDoc: AngularFirestoreDocument<Product>;

  constructor(public afs: AngularFirestore) {
    this.productCollection = this.afs.collection('products', ref => ref.orderBy('name', 'asc'));
    this.products = this.productCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Product;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }
  /**this function get the collection from the firebase */
  getItems() {
    this.productCollection = this.afs.collection('products', ref => ref.orderBy('name', 'asc'));
    this.products = this.productCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Product;
        data.id = a.payload.doc.id;
        return data;
      });
    });
    return this.products;
  }
  /**
   * function to add data into the collection
   * @param product
   */
  addItem(product: Product) {
    this.productCollection.add(product);
  }
  /**
   * function to delete the data from the collection
   * @param product
   */
  deleteItem(product: Product) {
    this.productDoc = this.afs.doc(`products/${product.id}`);
    this.productDoc.delete();
  }
  /**
   * function to update the data
   * @param product
   */
  updateItem(product: Product) {
    this.productDoc = this.afs.doc(`products/${product.id}`);
    this.productDoc.update(product);
  }

}
