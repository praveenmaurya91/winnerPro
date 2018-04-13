import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, FormGroupDirective, NgForm, FormBuilder, AbstractControl } from '@angular/forms';
import { ListsService } from '../../services/lists.service';
import { MatSnackBar } from '@angular/material';
import { Product } from '../../interfaces/product';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import printJS from 'print-js/src/index.js'
import { EditproductComponent } from './editproduct/editproduct.component';
import { ErrorStateMatcher } from '@angular/material';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  displayedColumns = ['name', 'sku', 'unit1', 'unit2', 'rasio2', 'unit3', 'rasio3', 'edit', 'delete'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  action: string;
  errors = errorMessages;
  items;
  
  constructor(private listsService: ListsService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.listsService.getItems().subscribe(items => {
      this.dataSource = new MatTableDataSource(items);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.items = items;
    });
  }

  print() {

    printJS(
      {
        printable: this.items,
        properties: ['name', 'sku', 'unit1', 'unit2', 'rasio2', 'unit3', 'rasio3'],
        type: 'json',
        header: `  
          <div>
            <div>
              <img  src="../../../assets/winner-small-logo.png">
            </div>
            <h5>
              List-Product
            </h5>
          </div>`,
        headerStyle: 'font-weight: 30px; text-align: center;',
        gridHeaderStyle: 'color: red;  border: 2px solid #3971A5; ',
        gridStyle: 'border: 2px solid #3971A5;'
      }
    )
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  trackByUid(index, item) {
    return item.uid;
  }

  form = new FormGroup({
    name: new FormControl('',  Validators.required ),
    sku: new FormControl(''),
    unit1: new FormControl('', Validators.required),

    unitGroup: this.formBuilder.group({
      rasio2: [''],
      unit2: [''],
      rasio3: [''],
      unit3: [''],
    }, 
      { validator: CustomValidation.MatchValidation }
  )
  });

  submit(form) {
    this.listsService.addItem(form.value);
    console.log(form.value)
    this.snackBar.open('Product has been saved', this.action, { duration: 4000 });
    this.form.reset();
  }

  openDialog(event, product: Product): void {
    const dialogRef = this.dialog.open(EditproductComponent, {
      width: '500px',
      data: product
    });
  }

  deleteProduct(event, product: Product) {
    this.listsService.deleteItem(product);
  }
}


/**
 * Collection of reusable error messages
 */
export const errorMessages: { [key: string]: string } = {
  name: 'Name is required',
  sku: 'SKU is required',
  unit1: 'Unit 1 is required',
  unit2: 'Unit 2 is required',
  unit3: 'Unit 3 is required',
  rasio2: 'Rasio 2 is required',
  rasio3: 'Rasio 3 is required',
};

export class CustomValidation {

  static MatchValidation(AC: AbstractControl) {
    let unit2 = AC.get('unit2').value; // to get value in input tag
    let rasio2 = AC.get('rasio2').value; // to get value in input tag
    let unit3 = AC.get('unit3').value; // to get value in input tag
    let rasio3 = AC.get('rasio3').value; // to get value in input tag
    if (rasio2 !== '' && unit2 == '' || unit3 !== '' && unit2 == '' ) {
      AC.get('unit2').setErrors({ MatchValidation: true });
    } 
    else {
      AC.get('unit2').setErrors(null);
    }
    if (rasio3 !== '' && unit3 == '') {
      AC.get('unit3').setErrors({ MatchValidation: true });
    }
    else {
      AC.get('unit3').setErrors(null);
    }
  }
}