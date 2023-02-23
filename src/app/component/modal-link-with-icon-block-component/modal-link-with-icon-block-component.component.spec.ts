import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLinkWithIconBlockComponentComponent } from './modal-link-with-icon-block-component.component';

describe('ModalLinkWithIconBlockComponentComponent', () => {
  let component: ModalLinkWithIconBlockComponentComponent;
  let fixture: ComponentFixture<ModalLinkWithIconBlockComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalLinkWithIconBlockComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalLinkWithIconBlockComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
