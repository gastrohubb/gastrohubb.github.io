import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFormCustomerComponent } from './profile-form-customer.component';

describe('ProfileFormCustomerComponent', () => {
  let component: ProfileFormCustomerComponent;
  let fixture: ComponentFixture<ProfileFormCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileFormCustomerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileFormCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
