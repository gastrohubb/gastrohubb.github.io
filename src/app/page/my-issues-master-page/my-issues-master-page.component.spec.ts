import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyIssuesMasterPageComponent } from './my-issues-master-page.component';

describe('MyIssuesMasterPageComponent', () => {
  let component: MyIssuesMasterPageComponent;
  let fixture: ComponentFixture<MyIssuesMasterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyIssuesMasterPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyIssuesMasterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
