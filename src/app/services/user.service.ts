import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api.service';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';
import { Subject } from 'rxjs/Subject';
import { Template } from '../models/template.model';

@Injectable()
export class UserService {

  user: User;
  templates: Subject<Template[]> = new Subject();

  constructor(private api: ApiService,
              private auth: AuthService) {
    if (this.auth.token) {
      this.getActiveUser();
    }
  }

  public login(username: string, password: string): Observable<any> {
    return Observable.create(obs => {
      this.api.authorizeV1(username, password).subscribe(
        ([token, user]) => {
          this.auth.token = token;
          this.setUser(user);
          if (this.auth.isUserLoggedIn()) {
            obs.next();
          } else {
            obs.error();
          }
        },
        error => {

        }
      )
    })
  }

  public setUser(user: User) {
    this.user = user;
    console.log(user);
    this.templates.next(this.user ? this.user.templates : []);
  }

  private getActiveUser() {
    this.api.activeUserV1().subscribe(
      user => this.setUser(user),
    )
  }
}
