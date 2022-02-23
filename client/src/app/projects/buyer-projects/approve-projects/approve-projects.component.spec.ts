import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveProjectsComponent } from './approve-projects.component';

describe('ApproveProjectsComponent', () => {
  let component: ApproveProjectsComponent;
  let fixture: ComponentFixture<ApproveProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
