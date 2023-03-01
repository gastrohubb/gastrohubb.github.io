import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritsPageComponent } from './favorits-page.component';

describe('FavoritsPageComponent', () => {
  let component: FavoritsPageComponent;
  let fixture: ComponentFixture<FavoritsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoritsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
