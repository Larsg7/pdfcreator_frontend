import { NgModule } from '@angular/core';
import { ApiService } from './api.service';
import { TemplateService } from './template.service';
import { UserService } from './user.service';
import { AlertService } from './alert.service';
import { AuthService } from './auth.service';
import { ThemeService } from './theme.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  providers: [
    ApiService,
    TemplateService,
    UserService,
    AlertService,
    AuthService,
    ThemeService,
  ],
  imports: [
    HttpClientModule,
  ]
})
export class ServiceModule { }
