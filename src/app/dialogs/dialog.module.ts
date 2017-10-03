import { NgModule } from '@angular/core';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../module/material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginDialogComponent,
  ],
  entryComponents: [
    LoginDialogComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    MaterialModule,
    FormsModule,
  ],
  exports: [
    LoginDialogComponent,
  ]
})
export class DialogModule { }
