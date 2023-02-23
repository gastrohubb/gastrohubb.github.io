import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HyperLinkBlockComponentLinkedToModalComponent } from './hyper-link-block-component-linked-to-modal.component';

describe('HyperLinkBlockComponentLinkedToModalComponent', () => {
  let component: HyperLinkBlockComponentLinkedToModalComponent;
  let fixture: ComponentFixture<HyperLinkBlockComponentLinkedToModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HyperLinkBlockComponentLinkedToModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HyperLinkBlockComponentLinkedToModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
