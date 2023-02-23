import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMasterPageComponent } from './home-master-page.component';

describe('HomeMasterPageComponent', () => {
  let component: HomeMasterPageComponent;
  let fixture: ComponentFixture<HomeMasterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeMasterPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeMasterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
