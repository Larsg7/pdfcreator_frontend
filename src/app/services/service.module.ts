import { NgModule } from '@angular/core';
import { ApiService } from './api.service';
import { TemplateService } from './template.service';
import { UserService } from './user.service';
import { AlertService } from './alert.service';
import { AuthService } from './auth.service';
import { ThemeService } from './theme.service';
import { HttpClientModule } from '@angular/common/http';
import { LoadingService } from './loading.service';
import { TableDecoderService } from './table-decoder.service';
import { FeedbackService } from './feedback.service';

@NgModule({
  providers: [
    AlertService,
    ApiService,
    TemplateService,
    UserService,
    AuthService,
    ThemeService,
    LoadingService,
    FeedbackService,
  ],
  imports: [HttpClientModule],
})
export class ServiceModule {}
