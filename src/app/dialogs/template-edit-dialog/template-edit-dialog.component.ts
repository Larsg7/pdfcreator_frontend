import { Component, OnInit } from '@angular/core';
import { TemplateService } from '../../services/template.service';
import { MatDialogRef } from '@angular/material';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-template-edit-dialog',
  templateUrl: './template-edit-dialog.component.html',
  styleUrls: ['./template-edit-dialog.component.scss']
})
export class TemplateEditDialogComponent implements OnInit {

  name: string;
  description: string;

  constructor(public templateService: TemplateService,
              public dialogRef: MatDialogRef<TemplateEditDialogComponent>,
              private alert: AlertService) {
    templateService.activeTemplateSub.subscribe(template => {
      if (template) {
        this.name = template.name;
        this.description = template.description;
      }
    });
  }

  ngOnInit() {
  }

  save() {
    this.templateService.activeTemplate.name = this.name;
    this.templateService.activeTemplate.description = this.description;
    this.templateService.update().subscribe(() => {
      this.templateService.reloadTemplate();
      this.alert.showSnack('Template gespeichert.');
      this.dialogRef.close();
    })
  }

}
