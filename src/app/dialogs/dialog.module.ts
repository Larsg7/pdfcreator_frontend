import { NgModule } from '@angular/core';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../module/material.module';
import { FormsModule } from '@angular/forms';
import { NewTemplateDialogComponent } from './new-template-dialog/new-template-dialog.component';
import { TemplateEditDialogComponent } from './template-edit-dialog/template-edit-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { AccountDialogComponent } from './account-dialog/account-dialog.component';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';

@NgModule({
  declarations: [
    LoginDialogComponent,
    NewTemplateDialogComponent,
    TemplateEditDialogComponent,
    ConfirmDialogComponent,
    AccountDialogComponent,
    RegisterDialogComponent,
  ],
  entryComponents: [
    LoginDialogComponent,
    NewTemplateDialogComponent,
    TemplateEditDialogComponent,
    ConfirmDialogComponent,
    AccountDialogComponent,
    RegisterDialogComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    MaterialModule,
    FormsModule,
  ],
  exports: [
    LoginDialogComponent,
    NewTemplateDialogComponent,
    TemplateEditDialogComponent,
    ConfirmDialogComponent,
    AccountDialogComponent,
    RegisterDialogComponent,
  ]
})
export class DialogModule { }
