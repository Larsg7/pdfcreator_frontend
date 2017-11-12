import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { matchOtherValidator } from '../register-dialog/register-dialog.component';
import { CONFIG } from '../../../config';
import { AlertService } from '../../services/alert.service';
import { Http } from '@angular/http';
import * as Raven from 'raven-js';


@Component({
  selector: 'app-password-forgot-dialog',
  templateUrl: './password-forgot-dialog.component.html',
  styleUrls: ['./password-forgot-dialog.component.scss']
})
export class PasswordForgotDialogComponent implements OnInit {

  authForm: FormGroup;
  newPasswordForm: FormGroup;

  authenticated = false;
  readonly authUrl = `${CONFIG.API_URL}/api/v1/password`;
  readonly resetUrl = `${CONFIG.API_URL}/api/v1/password/reset`;

  constructor(public dialogRef: MatDialogRef<PasswordForgotDialogComponent>,
              private formBuilder: FormBuilder,
              private http: Http,
              private alert: AlertService) {
    this.createForms();
  }

  private createForms() {
    this.authForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
    });
    this.newPasswordForm = this.formBuilder.group({
      token: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirm: ['', [Validators.required, matchOtherValidator('password')]],
    });
  }

  authUser() {
    if (this.authForm.invalid) {
      return;
    }
    const name = this.authForm.get('username').value;
    const email = this.authForm.get('email').value;
    this.http.post(this.authUrl, {
      Name: name,
      Email: email,
    }).subscribe(() => {
      this.authenticated = true;
    }, this.handleError);
  }

  resetPassword() {
    if (this.newPasswordForm.invalid) {
      return;
    }
    const name = this.authForm.get('username').value;
    const email = this.authForm.get('email').value;
    const token = this.newPasswordForm.get('token').value;
    const password = this.newPasswordForm.get('password').value;
    this.http.post(this.resetUrl, {
      Name: name,
      Email: email,
      Token: token,
      NewPassword: password,
    }).subscribe(() => {
      this.alert.showSnack('Passwort wurde zurückgesetzt. Bitte neu anmelden.');
      this.dialogRef.close();
    }, this.handleError);
  }

  private handleError(error) {
    Raven.captureMessage(error);
    this.alert.showError(error);
  }

  ngOnInit() {
  }

}
