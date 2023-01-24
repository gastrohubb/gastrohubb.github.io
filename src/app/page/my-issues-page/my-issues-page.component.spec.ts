import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyIssuesPageComponent } from './my-issues-page.component';

describe('MyIssuesPageComponent', () => {
  let component: MyIssuesPageComponent;
  let fixture: ComponentFixture<MyIssuesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyIssuesPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyIssuesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
