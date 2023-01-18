import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressModalFormComponent } from './address-modal-form.component';

describe('AddressModalFormComponent', () => {
  let component: AddressModalFormComponent;
  let fixture: ComponentFixture<AddressModalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressModalFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressModalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
