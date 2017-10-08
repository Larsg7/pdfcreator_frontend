import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api.service';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';
import { Subject } from 'rxjs/Subject';
import { Template } from '../models/template.model';
import { TemplateService } from './template.service';

@Injectable()
export class UserService {

  user: User;
  templates: Subject<Template[]> = new Subject();
  private _templates: Template[] = [];

  constructor(private api: ApiService,
              private auth: AuthService,
              private templateService: TemplateService) {
    if (this.auth.token) {
      this.getActiveUser();
    }

    templateService.activeTemplateSub.subscribe(template => {
      this.updateTemplate(template);
    });

    templateService.removeTemplatesSub.subscribe((id) => {
      this.deleteTemplate(id);
    })
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
    this.user = user;
    console.log(user);
    this.setTemplates(user.templates);
  }

  private setTemplates(templates: Template[]) {
    this._templates = templates ? templates : [];
    this.templates.next(templates);
  }

  public createNewTemplateForUser(template: Template): Observable<Template> {
    return Observable.create(obs => {
      this.api.newTemplateV1(template, this.user.id).subscribe((newTemplate: Template) => {
        this._templates.push(newTemplate);
        this.setTemplates(this._templates);
        obs.next(newTemplate);
      }, error => obs.error(error));
    });
  }

  private getActiveUser() {
    this.api.activeUserV1().subscribe(
      user => this.setUser(user),
    );
  }

  private updateTemplate(template: Template) {
    const index = this._templates.indexOf(this._templates.find(_ => _.id === template.id));
    if (index !== -1) {
      this._templates[index] = template;
      console.log('Updated template with id ' + template.id);
    }
  }

  private deleteTemplate(id: number) {
    const index = this._templates.indexOf(this._templates.find(_ => _.id === id));
    if (index !== -1) {
      this._templates.splice(index, 1);
    }
  }
}
