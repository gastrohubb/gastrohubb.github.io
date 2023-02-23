import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressFormMasterComponent } from './address-form-master.component';

describe('AddresFormMasterComponent', () => {
  let component: AddressFormMasterComponent;
  let fixture: ComponentFixture<AddressFormMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressFormMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressFormMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
