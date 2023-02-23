import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterInfoCardInListComponent } from './master-info-card-in-list.component';

describe('MasterInfoCardInListComponent', () => {
  let component: MasterInfoCardInListComponent;
  let fixture: ComponentFixture<MasterInfoCardInListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterInfoCardInListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterInfoCardInListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
