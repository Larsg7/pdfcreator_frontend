import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent implements OnInit {

  rawError: any;
  message: string;

  constructor(public dialogRef: MatDialogRef<ErrorDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    const rawError = data ? data.rawError : '';
    this.message = data ? data.message : 'Oops, es ist ein Fehler aufgetreten';
    try {
      this.rawError = JSON.parse(rawError);
    } catch (e) {
      this.rawError = rawError;
    }
  }

  ngOnInit() {
  }

}
