import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user.model';
import 'rxjs/add/operator/pluck';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { matchOtherValidator } from '../register-dialog/register-dialog.component';
import { MatDialogRef } from '@angular/material';
import { AlertService } from '../../services/alert.service';


@Component({
  selector: 'app-account-dialog',
  templateUrl: './account-dialog.component.html',
  styleUrls: ['./account-dialog.component.scss']
})
export class AccountDialogComponent implements OnInit {

  public user: Observable<User> = this.userService.user.asObservable();
  userForm: FormGroup;

  constructor(private userService: UserService,
              public dialogRef: MatDialogRef<AccountDialogComponent>,
              private formBuilder: FormBuilder,
              private alert: AlertService) {
    this.createForm();
  }

  private createForm() {
    this.user.subscribe(user => {
      this.userForm = this.formBuilder.group({
        username: [user.name, [Validators.required, Validators.minLength(3)]],
        email: [user.email, [Validators.required, Validators.email]],
        password: ['', [Validators.minLength(8)]],
        passwordConfirm: ['', [matchOtherValidator('password')]],
      });
    })
  }

  save() {
    const username = this.userForm.get('username').value;
    const email = this.userForm.get('email').value;
    const password = this.userForm.get('password').value;
    this.userService.updateUser(username, password, email).subscribe(() => {
      this.alert.showSnack('Nutzerdaten gesperichert.');
      this.dialogRef.close();
    });
  }

  ngOnInit() {
  }

}
