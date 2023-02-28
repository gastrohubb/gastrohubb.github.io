import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterAppliedIssueCardComponent } from './master-applied-issue-card.component';

describe('MasterAppliedIssueCardComponent', () => {
  let component: MasterAppliedIssueCardComponent;
  let fixture: ComponentFixture<MasterAppliedIssueCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterAppliedIssueCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterAppliedIssueCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
