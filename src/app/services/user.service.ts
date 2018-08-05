import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api.service';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';
import { Template } from '../models/template.model';
import { TemplateService } from './template.service';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/first';
import { CONFIG } from '../../config';
import { AlertService } from './alert.service';
import { FirstRunDialogComponent } from '../dialogs/first-run-dialog/first-run-dialog.component';
import { UpdatesDialogComponent } from '../dialogs/updates-dialog/updates-dialog.component';
import { Router } from '@angular/router';
import * as Raven from 'raven-js';

@Injectable()
export class UserService {
  public user: ReplaySubject<User> = new ReplaySubject(1);

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private templateService: TemplateService
  ) {
    this.setup();
  }

  public setup() {
    if (this.auth.isUserLoggedIn()) {
      this.getActiveUser();
    }
  }

  public login(username: string, password: string): Observable<any> {
    return this.api.authorizeV1(username, password).map(([token, user]) => {
      this.auth.token = token;
      this.setUser(user);
      if (this.auth.isUserLoggedIn()) {
        return true;
      } else {
        return false;
      }
    });
  }

  public setUser(user: User) {
    if (!user) return;
    Raven.setUserContext({
      email: user.email,
      id: user.id.toString(),
    });
    this.user.next(user);
    this.auth.userId = user.id;
    this.setTemplates(user.templates);
  }

  public updateUser(username: string, password: string, email: string) {
    return Observable.create(obs => {
      this.user
        .asObservable()
        .first()
        .subscribe(oldUser => {
          this.api
            .updateUserV1(oldUser.id, username, password, email)
            .subscribe(user => {
              if (!user) {
                obs.error();
              }
              user.templates = oldUser.templates;
              this.setUser(user);
              obs.next();
            });
        });
    });
  }

  private setTemplates(templates: Template[]) {
    this.templateService.setTemplates(templates);
  }

  private getActiveUser() {
    this.api.activeUserV1().subscribe(user => this.setUser(user));
  }
}
