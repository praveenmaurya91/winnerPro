import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, FormGroupDirective, NgForm, FormBuilder, AbstractControl } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';
import { MatSnackBar } from '@angular/material';
import { Invoice } from '../../interfaces/invoice';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import printJS from 'print-js/src/index.js'
import { EditinvoiceComponent } from './editinvoice/editinvoice.component';
import { ErrorStateMatcher } from '@angular/material';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  termsOfPayment: string;

  paymentTerms = [
    'penbayaian lebih zwal',
    'Backup bilyet giro bohari',
  ];
  displayedColumns = ['deloveryNoteNo', 'product', 'quantity', 'unit', 'unitPrice', 'amount', 'dc', 'pc', 'mc', 'ws', 'gc', 'quantityPatong'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  action: string;
  errors = errorMessages;
  items;
  form2: FormGroup;
  constructor(private transactionService: TransactionService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.transactionService.getItems().subscribe(items => {
      this.dataSource = new MatTableDataSource(items);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.items = items;
    });
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
    number: new FormControl('', Validators.required),
    date: new FormControl(''),
    customer: new FormControl('', Validators.required),
    terms: new FormControl('', Validators.required, ),
    paymentDue: new FormControl('', Validators.required),
    termsOfPayment: new FormControl( ),
    ppn: new FormControl('', ),
    description: new FormControl('', Validators.required),
  });

  submit(form) {
    this.transactionService.addItem(form.value);
    this.snackBar.open('Transaction has been saved', this.action, { duration: 4000 });
    this.form.reset();
  }

  openDialog(event, invoice: Invoice): void {
    const dialogRef = this.dialog.open(EditinvoiceComponent, {
      width: '500px',
      data: invoice
    });
  }

  deleteProduct(event, invoice: Invoice) {
    this.transactionService.deleteItem(invoice);
  }

}


/**
 * Collection of reusable error messages
 */
export const errorMessages: { [key: string]: string } = {
  number: 'Number is required',
  date: 'Date is required',
  customer: 'Customer  is required',
  terms: 'Terms is required',
  paymentDue: 'Payment Due 3 is required',
  termsOfPayment: 'Terms Of Payment is required',
  ppn: 'PPN is required',
  description: 'Description is required',
};

/**
 * Custom validator functions for reactive form validation
  * */
export class CustomValidators {
  /**
  * Validates that child controls in the form group are equal
  */
  static childrenEqual: ValidatorFn = (formGroup: FormGroup) => {
    const [firstControlName, ...otherControlNames] = Object.keys(formGroup.controls || {});
    const isValid = otherControlNames.every(controlName => (formGroup.get(controlName).value));
    return isValid ? null : { childrenNotEqual: true };
  }
}

/**
 * Custom ErrorStateMatcher which returns true (error exists) when the parent form group is invalid and the control has been touched
 */
export class ConfirmValidParentMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.parent.invalid && control.touched;
  }
}


// export class PasswordValidation {

//   static MatchPassword(AC: AbstractControl) {
//     let unit2 = AC.get('unit2').value; // to get value in input tag
//     let rasio2 = AC.get('rasio2').value; // to get value in input tag
//     if (unit2 == undefined) {
//       console.log('unit 2 is undefined');
//       //AC.get('unit2').setErrors({ MatchPassword: true });
//       //AC.get('rasio2').setErrors({MatchPassword:true});
//     }
//     else if (rasio2 == undefined) {
//       console.log('rasio 2 is undefined');
//     }
//     else {
//       console.log('false');
//       // AC.get('unit2').setErrors(null);
//     }
//   }
// }