import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditinvoiceComponent } from './editinvoice.component';

describe('EditinvoiceComponent', () => {
  let component: EditinvoiceComponent;
  let fixture: ComponentFixture<EditinvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditinvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditinvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
