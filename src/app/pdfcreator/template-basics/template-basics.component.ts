import { Component, OnInit } from '@angular/core';
import { TemplateService } from '../../services/template.service';
import { AlertService } from '../../services/alert.service';
import { TemplateEditDialogComponent } from '../../dialogs/template-edit-dialog/template-edit-dialog.component';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';
import { TemplateUploadDialogComponent } from '../../dialogs/template-upload-dialog/template-upload-dialog.component';

@Component({
  selector: 'app-template-basics',
  templateUrl: './template-basics.component.html',
  styleUrls: ['./template-basics.component.scss']
})
export class TemplateBasicsComponent implements OnInit {

  constructor(public templateService: TemplateService,
              private alert: AlertService,
              private nav: Router) {
  }

  ngOnInit() {
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
