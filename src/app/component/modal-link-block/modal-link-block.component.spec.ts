import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLinkBlockComponent } from './modal-link-block.component';

describe('ModalLinkBlockComponent', () => {
  let component: ModalLinkBlockComponent;
  let fixture: ComponentFixture<ModalLinkBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalLinkBlockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalLinkBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
