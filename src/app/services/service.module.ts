import { NgModule } from '@angular/core';
import { ApiService } from './api.service';
import { TemplateService } from './template.service';
import { UserService } from './user.service';

@NgModule({
  providers: [
    ApiService,
    TemplateService,
    UserService,
  ],
})
export class ServiceModule { }
