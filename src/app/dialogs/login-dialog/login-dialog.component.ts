import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-account-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

  username = '';
  password = '';

  constructor(private userService: UserService,
              public dialogRef: MdDialogRef<LoginDialogComponent>) { }

  login() {
    this.userService.login(this.username, this.password).subscribe(
      () => { this.dialogRef.close(); },
      () => {  },
    );
  }

  ngOnInit() {
  }

}
