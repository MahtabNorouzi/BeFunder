import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-investment-dialog',
  templateUrl: './investment-dialog.component.html',
  styleUrls: ['./investment-dialog.component.css']
})
export class InvestmentDialogComponent implements OnInit {
  projectTitle: string;
  investmentAmount: string;
  constructor(public dialogRef: MatDialogRef<InvestmentDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.projectTitle = data.projectTitle;
      console.log('this.projectTitle..:', this.projectTitle)
    }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close', data: this.investmentAmount });
  }

}
