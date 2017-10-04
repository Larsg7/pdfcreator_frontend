import { Component, OnInit } from '@angular/core';
import { CONFIG } from '../../../config';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public config = CONFIG;

  constructor(public authService: AuthService,
              public theme: ThemeService,
              public userService: UserService) {
  }

  public logout() {
    this.authService.logout();
    window.location.reload();
  }

  ngOnInit() {
  }

}
