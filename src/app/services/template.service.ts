import { Injectable } from '@angular/core';
import { Template } from '../models/template.model';
import { UserService } from './user.service';

@Injectable()
export class TemplateService {

  public templates: Template[] = [];
  public activeTemplate: Template;

  constructor(private userService: UserService) {
    this.userService.templates.subscribe(templates => this.templates = templates);
  }

}
