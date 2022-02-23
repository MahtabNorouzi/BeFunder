import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowerMainComponent } from './borrower-main.component';

describe('BorrowerMainComponent', () => {
  let component: BorrowerMainComponent;
  let fixture: ComponentFixture<BorrowerMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrowerMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowerMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
