import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueExtendedPageComponent } from './issue-extended-page.component';

describe('IssueExtendedPageComponent', () => {
  let component: IssueExtendedPageComponent;
  let fixture: ComponentFixture<IssueExtendedPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssueExtendedPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssueExtendedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
