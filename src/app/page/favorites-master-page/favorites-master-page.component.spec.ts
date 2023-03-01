import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesMasterPageComponent } from './favorites-master-page.component';

describe('FavoritesMasterPageComponent', () => {
  let component: FavoritesMasterPageComponent;
  let fixture: ComponentFixture<FavoritesMasterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoritesMasterPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritesMasterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
