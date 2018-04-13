import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AngularFirestore } from 'angularfire2/firestore';
import { ListsService } from '../../../services/lists.service';
import { Product } from '../../../interfaces/product';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {

items;

  ngOnInit() {
    this.listsService.getItems().subscribe(items => {
      this.items = items;
    });
  }

  name;
  sku;
  unit1;
  unit2;
  unit3;
  rasio2;
  rasio3;
  
  constructor(
    private listsService: ListsService,
    private afs: AngularFirestore,
    public dialogRef: MatDialogRef<EditproductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  updateProduct(): void {
    this.afs.collection('products').doc(this.data.id).update({ 
      name: this.name, 
      sku: this.sku, 
      unit1: this.unit1, 
      unit2: this.unit2, 
      unit3: this.unit3, 
      rasio2: this.rasio2, 
      rasio3: this.rasio3})
    this.dialogRef.close();
  }
}
