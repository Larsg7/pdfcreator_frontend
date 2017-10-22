import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { UserService } from '../../services/user.service';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent implements OnInit {

  newUserForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              public dialogRef: MdDialogRef<RegisterDialogComponent>,
              private api: ApiService,
              private userService: UserService) {
    this.createForm();
  }

  ngOnInit() {
  }

  private createForm() {
    this.newUserForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirm: ['', [Validators.required, matchOtherValidator('password')]],
    });
  }

  register() {
    console.log(this.newUserForm)
    const username: string = this.newUserForm.get('username').value;
    const email: string = this.newUserForm.get('email').value;
    const password: string = this.newUserForm.get('password').value;

    this.api.registerUserV1(username, password, email).subscribe(id => {
      if (id) {
        this.authNewUser(username, password);
      }
    })
  }

  private authNewUser(username: string, password: string) {
    this.userService.login(username, password).subscribe(user => {
      this.dialogRef.close();
    })
  }
}

export function matchOtherValidator (otherControlName: string) {

  let thisControl: FormControl;
  let otherControl: FormControl;

  return function matchOtherValidate (control: FormControl) {

    if (!control.parent) {
      return null;
    }

    // Initializing the validator.
    if (!thisControl) {
      thisControl = control;
      otherControl = control.parent.get(otherControlName) as FormControl;
      if (!otherControl) {
        throw new Error('matchOtherValidator(): other control is not found in parent group');
      }
      otherControl.valueChanges.subscribe(() => {
        thisControl.updateValueAndValidity();
      });
    }

    if (!otherControl) {
      return null;
    }

    if (otherControl.value !== thisControl.value) {
      return {
        matchOther: true
      };
    }

    return null;

  }

}
