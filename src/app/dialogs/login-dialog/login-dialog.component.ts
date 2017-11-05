import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatDialogRef } from '@angular/material';
import { AlertService } from '../../services/alert.service';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordForgotDialogComponent } from '../password-forgot-dialog/password-forgot-dialog.component';

@Component({
  selector: 'app-account-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private userService: UserService,
              public dialogRef: MatDialogRef<LoginDialogComponent>,
              public alert: AlertService,
              private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.formGroup.invalid) {
      return;
    }

    const username = this.formGroup.get('username').value;
    const password = this.formGroup.get('password').value;

    this.userService.login(username, password).subscribe(
      () => {
        this.dialogRef.close();
      },
      () => {
      },
    );
  }

  register() {
    this.alert.showDialog(RegisterDialogComponent, {}, true).then(() => this.dialogRef.close());
  }

  ngOnInit() {
  }

  forgotPassword() {
    this.alert.showDialog(PasswordForgotDialogComponent, {}, true);
  }
}
