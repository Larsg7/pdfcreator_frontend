import { Component, OnInit } from '@angular/core';
import { CONFIG } from '../../../config';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';
import { UserService } from '../../services/user.service';
import { LoadingService } from '../../services/loading.service';
import { AlertService } from '../../services/alert.service';
import { AccountDialogComponent } from '../../dialogs/account-dialog/account-dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public config = CONFIG;

  constructor(public authService: AuthService,
              public theme: ThemeService,
              public userService: UserService,
              public loadingService: LoadingService,
              private alert: AlertService) {
  }

  public logout() {
    this.authService.logout();
    window.location.reload();
  }

  ngOnInit() {
  }

  showAccountDialog() {
    this.alert.showDialog(AccountDialogComponent, {});
  }
}
