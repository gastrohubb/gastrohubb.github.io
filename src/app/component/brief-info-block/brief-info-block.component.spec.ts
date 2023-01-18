import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BriefInfoBlockComponent } from './brief-info-block.component';

describe('BriefInfoBlockComponent', () => {
  let component: BriefInfoBlockComponent;
  let fixture: ComponentFixture<BriefInfoBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BriefInfoBlockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BriefInfoBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
