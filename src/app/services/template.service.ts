import { Injectable } from '@angular/core';
import { Template } from '../models/template.model';
import { Subject } from 'rxjs/Subject';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { AuthService } from './auth.service';

@Injectable()
export class TemplateService {
  get activeTemplate(): Template {
    return this._activeTemplate;
  }

  set activeTemplate(template: Template) {
    if (!this.activeTemplate || (template && this.activeTemplate.id !== template.id)) {
      this._activeTemplate = template;
      this.getActiveTemplateDetails().subscribe(() => {
        this.activeTemplateSub.next(this._activeTemplate);
      });
    }
  }

  private _activeTemplate: Template;
  public activeTemplateSub: ReplaySubject<Template> = new ReplaySubject(1);

  private _templates: Template[] = [];
  public templates: ReplaySubject<Template[]> = new ReplaySubject(1);

  constructor(private api: ApiService,
              private auth: AuthService) {
  }

  public getActiveTemplateDetails(): Observable<Template> {
    return Observable.create(obs => {
      if (this.activeTemplate) {
        this.getActiveTemplateDetailsFromApi(obs);
      } else {
        this.activeTemplateSub.subscribe(() => {
          this.getActiveTemplateDetailsFromApi(obs);
        });
      }
    });
  }

  private getActiveTemplateDetailsFromApi(obs) {
    this.api.getTemplateDetails(this.activeTemplate.id).subscribe(template => {
      this._activeTemplate = template;
      obs.next(template);
    });
  }

  update() {
    return this.api.updateTemplate(this.activeTemplate).map(template => {
        this.updateTemplate(template);
        this.activeTemplate = template;
        this.activeTemplateSub.next(template);
      });
  }

  remove() {
    return this.api.deleteTemplate(this.activeTemplate).map(() => {
      const index = this._templates.indexOf(this.activeTemplate);
      this._templates.splice(index, 1);
      this.templates.next(this._templates);
    });
  }

  public createNewTemplateForUser(template: Template): Observable<Template> {
    return Observable.create(obs => {
      this.api.newTemplateV1(template, this.auth.userId).subscribe((newTemplate: Template) => {
        this._templates.push(newTemplate);
        this.templates.next(this._templates);
        obs.next(newTemplate);
      }, error => obs.error(error));
    });
  }

  private updateTemplate(template: Template) {
    const index = this._templates.indexOf(this._templates.find(_ => _.id === template.id));
    console.log(index)
    if (index !== -1) {
      this._templates[index] = template;
      console.log('Updated template with id ' + template.id);
      this.templates.next(this._templates);
    }
  }

  setTemplates(templates: Template[]) {
    this._templates = templates;
    this.templates.next(templates);
  }
}
