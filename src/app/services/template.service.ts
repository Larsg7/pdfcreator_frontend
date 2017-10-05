import { Injectable } from '@angular/core';
import { Template } from '../models/template.model';
import { Subject } from 'rxjs/Subject';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TemplateService {
  get activeTemplate(): Template {
    return this._activeTemplate;
  }

  set activeTemplate(template: Template) {
    this._activeTemplate = template;
    this.getActiveTemplateDetails().subscribe(() => {
      this.activeTemplateSub.next(this._activeTemplate);
    });
  }

  private _activeTemplate: Template;
  public activeTemplateSub: Subject<Template> = new Subject();

  constructor(private api: ApiService) {
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
}
