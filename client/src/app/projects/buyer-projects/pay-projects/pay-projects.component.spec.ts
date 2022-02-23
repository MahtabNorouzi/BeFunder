import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayProjectsComponent } from './pay-projects.component';

describe('PayProjectsComponent', () => {
  let component: PayProjectsComponent;
  let fixture: ComponentFixture<PayProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
