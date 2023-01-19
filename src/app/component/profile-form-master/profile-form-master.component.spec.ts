import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFormMasterComponent } from './profile-form-master.component';

describe('ProfileFormMasterComponent', () => {
  let component: ProfileFormMasterComponent;
  let fixture: ComponentFixture<ProfileFormMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileFormMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileFormMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
