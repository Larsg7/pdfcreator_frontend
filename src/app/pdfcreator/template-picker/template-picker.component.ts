import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Template } from '../../models/template.model';
import { AlertService } from '../../services/alert.service';
import { NewTemplateDialogComponent } from '../../dialogs/new-template-dialog/new-template-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TemplateService } from '../../services/template.service';
import 'rxjs/add/observable/combineLatest';

@Component({
  selector: 'app-template-picker',
  templateUrl: './template-picker.component.html',
  styleUrls: ['./template-picker.component.scss']
})
export class TemplatePickerComponent implements OnInit {
  get currentTemplateId(): number {
    return this._currentTemplateId;
  }

  set currentTemplateId(id: number) {
    this.templateService.activeTemplate = this.templates.find(_ => _.id === id);
    this.nav.navigate(['/app', id]);
    this._currentTemplateId = id;
  }

  templates: Template[] = [];
  public _currentTemplateId: number;

  constructor(public userService: UserService,
              public alert: AlertService,
              private nav: Router,
              public templateService: TemplateService,
              private route: ActivatedRoute) {
    this.templateService.templates.subscribe(templates => {
      this.templates = templates;
      if (route.firstChild) {
        route.firstChild.params.subscribe(params => {
          if (params) {
            this.currentTemplateId = +params['id'];
          }
        });
      }
    });

  }

  ngOnInit() {
  }

  newTemplate() {
    this.alert.showDialog(NewTemplateDialogComponent, {}).then(id => {
      if (id) {
        this.nav.navigate(['/app', id]);
      }
    });
  }
}
