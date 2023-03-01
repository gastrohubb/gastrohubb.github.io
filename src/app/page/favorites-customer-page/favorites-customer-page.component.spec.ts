import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesCustomerPageComponent } from './favorites-customer-page.component';

describe('FavoritesCustomerPageComponent', () => {
  let component: FavoritesCustomerPageComponent;
  let fixture: ComponentFixture<FavoritesCustomerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoritesCustomerPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritesCustomerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
