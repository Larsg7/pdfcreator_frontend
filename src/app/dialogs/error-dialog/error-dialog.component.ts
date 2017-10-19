import { Component, Inject, OnInit } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { tryCatch } from 'rxjs/util/tryCatch';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent implements OnInit {

  message: any;

  constructor(public dialogRef: MdDialogRef<ErrorDialogComponent>,
              @Inject(MD_DIALOG_DATA) public data: any) {
    const message = data ? data.message : '';
    try {
      this.message = JSON.parse(message);
    } catch (e) {
      this.message = message;
    }
  }

  ngOnInit() {
  }

}
