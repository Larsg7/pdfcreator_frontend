import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdDialogRef } from '@angular/material';
import { matchOtherValidator } from '../register-dialog/register-dialog.component';

@Component({
  selector: 'app-password-forgot-dialog',
  templateUrl: './password-forgot-dialog.component.html',
  styleUrls: ['./password-forgot-dialog.component.scss']
})
export class PasswordForgotDialogComponent implements OnInit {

  authForm: FormGroup;
  newPasswordForm: FormGroup;

  authenticated = false;

  constructor(public dialogRef: MdDialogRef<PasswordForgotDialogComponent>,
              private formBuilder: FormBuilder) {
    this.createForms();
  }

  private createForms() {
    this.authForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
    });
    this.newPasswordForm = this.formBuilder.group({
      token: ['', Validators.required],
      ppassword: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirm: ['', [Validators.required, matchOtherValidator('password')]],
    });
  }

  authUser() {

  }

  resetPassword() {

  }

  ngOnInit() {
  }

}
