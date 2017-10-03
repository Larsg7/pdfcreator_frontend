import { NgModule } from '@angular/core';
import {
  MdButtonModule, MdDialogModule, MdFormFieldModule, MdIconModule, MdInputModule, MdListModule, MdMenuModule,
  MdSidenavModule, MdSnackBarModule,
  MdToolbarModule
} from '@angular/material';

@NgModule({
  imports: [
    MdButtonModule,
    MdSidenavModule,
    MdToolbarModule,
    MdIconModule,
    MdMenuModule,
    MdListModule,
    MdDialogModule,
    MdInputModule,
    MdFormFieldModule,
    MdSnackBarModule,
  ],
  exports: [
    MdButtonModule,
    MdSidenavModule,
    MdIconModule,
    MdMenuModule,
    MdListModule,
    MdToolbarModule,
    MdDialogModule,
    MdInputModule,
    MdFormFieldModule,
    MdSnackBarModule,
  ]
})
export class MaterialModule {
}
