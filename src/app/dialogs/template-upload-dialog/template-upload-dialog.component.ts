import { Component, OnInit } from '@angular/core';
import { CONFIG } from '../../../config';
import { FileUploader } from 'ng2-file-upload';
import { TemplateService } from '../../services/template.service';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import { MdDialogRef } from '@angular/material';

function uploadUrl(id: number) {
  return CONFIG.API_URL + '/api/v1/document/' + id;
}

@Component({
  selector: 'app-template-upload-dialog',
  templateUrl: './template-upload-dialog.component.html',
  styleUrls: ['./template-upload-dialog.component.scss']
})
export class TemplateUploadDialogComponent implements OnInit {

  public uploader: FileUploader;

  constructor(private templateService: TemplateService,
              private authService: AuthService,
              private alert: AlertService,
              public dialogRef: MdDialogRef<TemplateUploadDialogComponent>) {
  }

  ngOnInit() {
    this.templateService.activeTemplateSub.subscribe(template => {
      this.uploader = new FileUploader({url: uploadUrl(template.id), authToken: 'Bearer ' + this.authService.token});
    });
  }

  upload() {
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('ImageUpload:uploaded:', item, status);
      if (status !== 200) {
        this.alert.showError('Es gab ein Problem beim Hochladen der Datei.');
      } else {
        this.alert.showSnack('Dokument hochgeladen.');
        this.templateService.reloadTemplate()
        this.dialogRef.close();
      }
    };
    this.uploader.uploadAll();
  }
}
