import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppMaterialModule } from './app-material/app-material.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

/**services*/
import { ListsService } from './services/lists.service';
import { TransactionService } from './services/transaction.service';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductComponent } from './lists/product/product.component';
import { EditproductComponent } from './lists/product/editproduct/editproduct.component';
import { InvoiceComponent } from './transaction/invoice/invoice.component';
import { EditinvoiceComponent } from './transaction/invoice/editinvoice/editinvoice.component';


const appRoutes: Routes = [
  { path: 'product', component: ProductComponent},
  { path: 'invoice', component: InvoiceComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductComponent,
    EditproductComponent,
    InvoiceComponent,
    EditinvoiceComponent,
 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot(
      appRoutes
    ),
  ],
  providers: [
    ListsService,
    TransactionService
  ],
  bootstrap: [AppComponent],
  entryComponents: [EditproductComponent]
})
export class AppModule { }
