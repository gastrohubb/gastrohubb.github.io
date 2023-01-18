import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HyperLinkBlockComponent } from './hyper-link-block.component';

describe('HyperLinkBlockComponent', () => {
  let component: HyperLinkBlockComponent;
  let fixture: ComponentFixture<HyperLinkBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HyperLinkBlockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HyperLinkBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
