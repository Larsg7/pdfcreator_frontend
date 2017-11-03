import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdDialogRef } from '@angular/material';
import { matchOtherValidator } from '../register-dialog/register-dialog.component';
import { HttpClient } from '@angular/common/http';
import { CONFIG } from '../../../config';
import { AlertService } from '../../services/alert.service';

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

  constructor(public dialogRef: MdDialogRef<PasswordForgotDialogComponent>,
              private formBuilder: FormBuilder,
              private http: HttpClient,
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
    }, error => this.alert.showError(error));
  }

  resetPassword() {
    if (this.newPasswordForm.invalid) {
      return;
    }
    const token = this.newPasswordForm.get('token').value;
    const password = this.newPasswordForm.get('password').value;
    this.http.post(this.resetUrl, {
      Token: token,
      NewPassword: password,
    }).subscribe(() => {
      this.alert.showSnack('Passwort wurde zurückgesetzt. Bitte neu anmelden.');
      this.dialogRef.close();
    }, error => this.alert.showError(error));
  }

  ngOnInit() {
  }

}
