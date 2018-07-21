import { Component, OnInit } from '@angular/core';
import { TemplateService } from '../../services/template.service';
import { AlertService } from '../../services/alert.service';
import { TemplateEditDialogComponent } from '../../dialogs/template-edit-dialog/template-edit-dialog.component';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';
import { TemplateUploadDialogComponent } from '../../dialogs/template-upload-dialog/template-upload-dialog.component';
import { ApiService } from '../../services/api.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-template-basics',
  templateUrl: './template-basics.component.html',
  styleUrls: ['./template-basics.component.scss']
})
export class TemplateBasicsComponent implements OnInit {

  templateLink: string;

  constructor(public templateService: TemplateService,
              private alert: AlertService,
              private nav: Router,
              private api: ApiService) {

  }

  ngOnInit() {
    this.templateService.activeTemplateSub.subscribe(template => {
      this.templateLink = `${environment.API_URL}/api/v1/document/${template.token}`;
    });
  }

  edit() {
    this.alert.showDialog(TemplateEditDialogComponent, {});
  }

  upload() {
    this.alert.showDialog(TemplateUploadDialogComponent, {});
  }

  remove() {
    this.alert.showDialog(ConfirmDialogComponent, { title: 'Template wirklich löschen?' }).then(res => {
      if (res) {
        this.templateService.remove().subscribe(() => {
          this.nav.navigate(['/app']);
        });
      }
    });
  }
}
