import { NgModule } from '@angular/core';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../module/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewTemplateDialogComponent } from './new-template-dialog/new-template-dialog.component';
import { TemplateEditDialogComponent } from './template-edit-dialog/template-edit-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { AccountDialogComponent } from './account-dialog/account-dialog.component';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { TemplateUploadDialogComponent } from './template-upload-dialog/template-upload-dialog.component';
import { FileUploadModule } from 'ng2-file-upload';
import { PasswordForgotDialogComponent } from './password-forgot-dialog/password-forgot-dialog.component';
import { TemplateSeriesDialogComponent } from './template-series-dialog/template-series-dialog.component';
import { FeedbackDialogComponent } from './feedback-dialog/feedback-dialog.component';
import { FirstRunDialogComponent } from './first-run-dialog/first-run-dialog.component';
import { UpdatesDialogComponent } from './updates-dialog/updates-dialog.component';

@NgModule({
  declarations: [
    LoginDialogComponent,
    NewTemplateDialogComponent,
    TemplateEditDialogComponent,
    ConfirmDialogComponent,
    AccountDialogComponent,
    RegisterDialogComponent,
    ErrorDialogComponent,
    TemplateUploadDialogComponent,
    PasswordForgotDialogComponent,
    TemplateSeriesDialogComponent,
    FeedbackDialogComponent,
    FirstRunDialogComponent,
    UpdatesDialogComponent,
  ],
  entryComponents: [
    LoginDialogComponent,
    NewTemplateDialogComponent,
    TemplateEditDialogComponent,
    ConfirmDialogComponent,
    AccountDialogComponent,
    RegisterDialogComponent,
    ErrorDialogComponent,
    TemplateUploadDialogComponent,
    PasswordForgotDialogComponent,
    TemplateSeriesDialogComponent,
    FeedbackDialogComponent,
    FirstRunDialogComponent,
    UpdatesDialogComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
  ],
  exports: [
    LoginDialogComponent,
    NewTemplateDialogComponent,
    TemplateEditDialogComponent,
    ConfirmDialogComponent,
    AccountDialogComponent,
    RegisterDialogComponent,
    ErrorDialogComponent,
    TemplateUploadDialogComponent,
    PasswordForgotDialogComponent,
    TemplateSeriesDialogComponent,
    FeedbackDialogComponent,
    FirstRunDialogComponent,
    UpdatesDialogComponent,
  ]
})
export class DialogModule { }
