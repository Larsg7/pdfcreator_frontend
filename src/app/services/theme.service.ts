import { Injectable, OnInit } from '@angular/core';

@Injectable()
export class ThemeService implements OnInit {

  public isDarkTheme = false;

  constructor() {
    this.isDarkTheme = localStorage.getItem('isDarkTheme') === 'yes';
    this.toggleBodyClass();
  }

  ngOnInit() {
  }

  private toggleBodyClass() {
    if (this.isDarkTheme) {
      document.body.className = 'app-dark';
    } else {
      document.body.className = '';
    }
  }

  public toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this.toggleBodyClass();
    localStorage.setItem('isDarkTheme', this.isDarkTheme ? 'yes' : 'no');
  }

}
