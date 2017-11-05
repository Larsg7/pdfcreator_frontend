import { Injectable, OnInit } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { AlertService } from './alert.service';

@Injectable()
export class AuthService implements OnInit {

  private _token: string;
  public userId: number;

  constructor(private alert: AlertService) {
    this._token = localStorage.getItem('token');
  }

  ngOnInit() {
  }

  get token(): string {
    return this._token && this._token !== 'undefined' ? this._token : '';
  }

  set token(value: string) {
    this._token = value;
    localStorage.setItem('token', this._token);
  }

  public logout() {
    this.token = '';
  }

  public isUserLoggedIn() {
    const jwt = new JwtHelper();

    if (!this._token) return false;

    try {
      return !jwt.isTokenExpired(this._token);
    } catch (e) {
      return false;
    }
  }
}
