import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';
import { LoginDialogComponent } from '../dialogs/login-dialog/login-dialog.component';
import { CONFIG } from '../../config';
import { UpdatesDialogComponent } from '../dialogs/updates-dialog/updates-dialog.component';
import { FirstRunDialogComponent } from '../dialogs/first-run-dialog/first-run-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pdfcreator',
  templateUrl: './pdfcreator.component.html',
  styleUrls: ['./pdfcreator.component.scss']
})
export class PdfcreatorComponent implements OnInit {

  public isFirstRun = true;
  public showUpdates = true;

  constructor(private authService: AuthService,
              private alertService: AlertService,
              private alert: AlertService,
              private nav: Router) {
    if (!this.authService.isUserLoggedIn()) {
      this.nav.navigate(['/']);
    } else {
      this.checkFirstRun();
    }
  }

  private checkUpdates() {
    this.showUpdates = localStorage.getItem('updates') !== CONFIG.VERSION;

    if (this.showUpdates) {
      this.alert.showDialog(UpdatesDialogComponent, {}).then((res) => {
        if (res) this.setShowNoUpdates();
      });
    }
  }

  private checkFirstRun() {
    this.isFirstRun = !localStorage.getItem('isFirstRun');

    if (this.isFirstRun) {
      this.alert.showDialog(FirstRunDialogComponent, {}, true).then((res) => {
        if (res) this.setNotFirstRun();
        this.checkUpdates();
      });
    } else {
      this.checkUpdates();
    }
  }

  public setNotFirstRun() {
    localStorage.setItem('isFirstRun', 'no');
  }

  public setShowNoUpdates() {
    localStorage.setItem('updates', CONFIG.VERSION);
  }

  ngOnInit() {
  }
}
