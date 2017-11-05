import { Component, OnInit } from '@angular/core';
import { CONFIG } from '../../../config';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-first-run-dialog',
  templateUrl: './first-run-dialog.component.html',
  styleUrls: ['./first-run-dialog.component.scss']
})
export class FirstRunDialogComponent implements OnInit {

  config = CONFIG;
  doNotShowAgain = false;

  constructor(public dialogRef: MatDialogRef<FirstRunDialogComponent>) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close(this.doNotShowAgain);
  }

}
