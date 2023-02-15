import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterInfoBlockComponent } from './master-info-block.component';

describe('MasterInfoBlockComponent', () => {
  let component: MasterInfoBlockComponent;
  let fixture: ComponentFixture<MasterInfoBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterInfoBlockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterInfoBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
