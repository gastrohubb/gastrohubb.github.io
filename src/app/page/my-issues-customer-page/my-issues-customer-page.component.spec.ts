import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyIssuesCustomerPageComponent } from './my-issues-customer-page.component';

describe('MyIssuesCustomerPageComponent', () => {
  let component: MyIssuesCustomerPageComponent;
  let fixture: ComponentFixture<MyIssuesCustomerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyIssuesCustomerPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyIssuesCustomerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
