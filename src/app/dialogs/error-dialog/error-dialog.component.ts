import { Component, Inject, OnInit } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent implements OnInit {

  message: string;

  constructor(public dialogRef: MdDialogRef<ErrorDialogComponent>,
              @Inject(MD_DIALOG_DATA) public data: any) {
    this.message = data ? data.message : '';
  }

  ngOnInit() {
  }

}
