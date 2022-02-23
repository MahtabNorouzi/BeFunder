import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowerProjectsComponent } from './borrower-projects.component';

describe('BorrowerProjectsComponent', () => {
  let component: BorrowerProjectsComponent;
  let fixture: ComponentFixture<BorrowerProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrowerProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowerProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
