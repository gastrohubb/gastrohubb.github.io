import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCustomerPageComponent } from './home-customer-page.component';

describe('HomeCustomerPageComponent', () => {
  let component: HomeCustomerPageComponent;
  let fixture: ComponentFixture<HomeCustomerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeCustomerPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeCustomerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
