import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleForkComponent } from './role-fork.component';

describe('RoleForkComponent', () => {
  let component: RoleForkComponent;
  let fixture: ComponentFixture<RoleForkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleForkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleForkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
