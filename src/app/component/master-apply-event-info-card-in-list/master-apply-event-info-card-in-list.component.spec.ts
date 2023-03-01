import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterApplyEventInfoCardInListComponent } from './master-apply-event-info-card-in-list.component';

describe('MasterApplyEventInfoCardInListComponent', () => {
  let component: MasterApplyEventInfoCardInListComponent;
  let fixture: ComponentFixture<MasterApplyEventInfoCardInListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterApplyEventInfoCardInListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterApplyEventInfoCardInListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
