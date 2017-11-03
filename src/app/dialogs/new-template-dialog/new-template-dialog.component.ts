import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Template } from '../../models/template.model';
import { AlertService } from '../../services/alert.service';
import { MdDialogRef } from '@angular/material';
import { TemplateService } from '../../services/template.service';

@Component({
  selector: 'app-new-template-dialog',
  templateUrl: './new-template-dialog.component.html',
  styleUrls: ['./new-template-dialog.component.scss']
})
export class NewTemplateDialogComponent implements OnInit {

  name: string;
  description = '';

  constructor(private userService: UserService,
              private alert: AlertService,
              public dialogRef: MdDialogRef<NewTemplateDialogComponent>,
              private templateService: TemplateService) {
  }

  ngOnInit() {
  }

  submit() {
    const template = new Template(0, this.name, this.description, null, null, null);
    this.templateService.createNewTemplateForUser(template).subscribe((newTemplate) => {
      this.alert.showSnack(`Template "${this.name}" erstellt.`);
      this.templateService.activeTemplate = newTemplate;
      this.dialogRef.close(newTemplate.id);
    });
  }
}
