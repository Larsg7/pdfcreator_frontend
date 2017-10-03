import { Injectable, OnInit } from '@angular/core';

@Injectable()
export class ThemeService implements OnInit {

  public isDarkTheme = false;

  constructor() {
    this.isDarkTheme = localStorage.getItem('isDarkTheme') === 'yes';
  }

  ngOnInit() {
  }

  public toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    localStorage.setItem('isDarkTheme', this.isDarkTheme ? 'yes' : 'no');
  }

}
