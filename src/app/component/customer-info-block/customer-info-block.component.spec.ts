import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerInfoBlockComponent } from './customer-info-block.component';

describe('CustomerInfoBlockComponent', () => {
  let component: CustomerInfoBlockComponent;
  let fixture: ComponentFixture<CustomerInfoBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerInfoBlockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerInfoBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
