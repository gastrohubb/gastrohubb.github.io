import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueFormPageComponent } from './issue-form-page.component';

describe('IssueFormPageComponent', () => {
  let component: IssueFormPageComponent;
  let fixture: ComponentFixture<IssueFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssueFormPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssueFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
