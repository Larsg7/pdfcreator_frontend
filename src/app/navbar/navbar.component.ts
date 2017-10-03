import { Component, OnInit } from '@angular/core';
import { CONFIG } from '../../config';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public config = CONFIG;
  public isDarkTheme = false;

  constructor() { }

  ngOnInit() {
    this.isDarkTheme = localStorage.getItem('isDarkTheme') === 'yes';
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    localStorage.setItem('isDarkTheme', this.isDarkTheme ? 'yes' : 'no');
  }
}
