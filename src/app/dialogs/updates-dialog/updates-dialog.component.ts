import { Component, OnInit } from '@angular/core';
import { CONFIG } from '../../../config';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-updates-dialog',
  templateUrl: './updates-dialog.component.html',
  styleUrls: ['./updates-dialog.component.scss']
})
export class UpdatesDialogComponent implements OnInit {

  config = CONFIG;
  doNotShowAgain = false;

  constructor(public dialogRef: MatDialogRef<UpdatesDialogComponent>) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close(this.doNotShowAgain);
  }

}
