import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerMainComponent } from './buyer-main.component';

describe('BuyerMainComponent', () => {
  let component: BuyerMainComponent;
  let fixture: ComponentFixture<BuyerMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
