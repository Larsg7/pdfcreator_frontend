import { Component, Inject, OnInit } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(public dialogRef: MdDialogRef<ConfirmDialogComponent>,
              @Inject(MD_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  yes() {
    this.dialogRef.close(true);
  }
}
