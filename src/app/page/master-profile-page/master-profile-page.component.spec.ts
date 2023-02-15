import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterProfilePageComponent } from './master-profile-page.component';

describe('MasterProfilePageComponent', () => {
  let component: MasterProfilePageComponent;
  let fixture: ComponentFixture<MasterProfilePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterProfilePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
