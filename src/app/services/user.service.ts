import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api.service';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';
import { Subject } from 'rxjs/Subject';
import { Template } from '../models/template.model';
import { TemplateService } from './template.service';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class UserService {

  public user: ReplaySubject<User> = new ReplaySubject(1);

  constructor(private api: ApiService,
              private auth: AuthService,
              private templateService: TemplateService) {
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
      );
    });
  }

  public setUser(user: User) {
    this.user.next(user);
    this.auth.userId = user.id;
    console.log(user);
    this.setTemplates(user.templates);
  }

  private setTemplates(templates: Template[]) {
    this.templateService.setTemplates(templates);
  }

  private getActiveUser() {
    this.api.activeUserV1().subscribe(
      user => this.setUser(user),
    );
  }
}
