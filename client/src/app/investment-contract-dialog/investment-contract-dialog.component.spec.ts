import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentContractDialogComponent } from './investment-contract-dialog.component';

describe('InvestmentContractDialogComponent', () => {
  let component: InvestmentContractDialogComponent;
  let fixture: ComponentFixture<InvestmentContractDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestmentContractDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentContractDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
