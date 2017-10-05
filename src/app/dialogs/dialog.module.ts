import { NgModule } from '@angular/core';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../module/material.module';
import { FormsModule } from '@angular/forms';
import { NewTemplateDialogComponent } from './new-template-dialog/new-template-dialog.component';

@NgModule({
  declarations: [
    LoginDialogComponent,
    NewTemplateDialogComponent,
  ],
  entryComponents: [
    LoginDialogComponent,
    NewTemplateDialogComponent,
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
  ]
})
export class DialogModule { }
