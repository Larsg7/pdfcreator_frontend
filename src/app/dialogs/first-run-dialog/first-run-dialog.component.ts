import { Component, OnInit } from '@angular/core';
import { CONFIG } from '../../../config';
import { MatDialogRef } from '@angular/material';
import { NgxCarousel } from 'ngx-carousel';

@Component({
  selector: 'app-first-run-dialog',
  templateUrl: './first-run-dialog.component.html',
  styleUrls: ['./first-run-dialog.component.scss']
})
export class FirstRunDialogComponent implements OnInit {

  config = CONFIG;
  doNotShowAgain = false;

  public carousel: NgxCarousel;
  public carouselEnded = false;

  constructor(public dialogRef: MatDialogRef<FirstRunDialogComponent>) { }

  ngOnInit() {
    this.carousel = {
      grid: {xs: 1, sm: 1, md: 1, lg: 1, all: 0},
      speed: 400,
      point: {
        visible: true
      },
      load: 1,
      touch: true,
      loop: false,
      custom: 'banner'
    }
  }

  close() {
    this.dialogRef.close(this.doNotShowAgain);
  }

  onEnd(event) {
    if (event.isLast) {
      this.carouselEnded = true;
    }
  }
}
