import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';
import { LoginDialogComponent } from '../dialogs/login-dialog/login-dialog.component';

@Component({
  selector: 'app-pdfcreator',
  templateUrl: './pdfcreator.component.html',
  styleUrls: ['./pdfcreator.component.scss']
})
export class PdfcreatorComponent implements OnInit {

  constructor(private authService: AuthService,
              private alertService: AlertService) {
    if (!this.authService.isUserLoggedIn()) {
      this.alertService.showDialog(LoginDialogComponent, {});
    }
  }

  ngOnInit() {
  }
}
