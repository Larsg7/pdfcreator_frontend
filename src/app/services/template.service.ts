import { Injectable } from '@angular/core';
import { Template } from '../models/template.model';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { AuthService } from './auth.service';
import { AlertService } from './alert.service';
import { TemplateField } from '../models/template-fields';

@Injectable()
export class TemplateService {
  get activeTemplate(): Template {
    return this._activeTemplate;
  }

  set activeTemplate(template: Template) {
    if (!template) {
      return;
    }
    if (
      !this.activeTemplate ||
      (template && this.activeTemplate.id !== template.id)
    ) {
      this.activeTemplateSub.next(template);
      this.reloadTemplate(template);
    }
  }

  private _activeTemplate: Template;
  public activeTemplateSub: ReplaySubject<Template> = new ReplaySubject(1);

  private _templates: Template[] = [];
  public templates: ReplaySubject<Template[]> = new ReplaySubject(1);

  constructor(private api: ApiService, private auth: AuthService) {}

  public reloadTemplate(template?: Template) {
    template = template ? template : this.activeTemplate;
    this.getActiveTemplateDetails(template.id, template.fields).subscribe(
      templateWithDetails => {
        this._activeTemplate = templateWithDetails;
        this.activeTemplateSub.next(this._activeTemplate);
      }
    );
  }

  private getActiveTemplateDetails(
    id: number,
    fields: TemplateField[][]
  ): Observable<Template> {
    return this.api.getTemplateDetailsV1(id, fields);
  }

  update() {
    return this.api.updateTemplateV1(this.activeTemplate).map(template => {
      this.updateTemplate(template);
      this.activeTemplate = template;
      this.activeTemplateSub.next(template);
    });
  }

  remove() {
    return this.api.deleteTemplateV1(this.activeTemplate).map(() => {
      const index = this._templates.indexOf(this.activeTemplate);
      this._templates.splice(index, 1);
      this.templates.next(this._templates);
    });
  }

  public createNewTemplateForUser(template: Template): Observable<Template> {
    return Observable.create(obs => {
      this.api.newTemplateV1(template, this.auth.userId).subscribe(
        (newTemplate: Template) => {
          this._templates.push(newTemplate);
          this.templates.next(this._templates);
          console.log(this._templates);
          obs.next(newTemplate);
        },
        error => obs.error(error)
      );
    });
  }

  private updateTemplate(template: Template) {
    const index = this._templates.indexOf(
      this._templates.find(_ => _.id === template.id)
    );
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
