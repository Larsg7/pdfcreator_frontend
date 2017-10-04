import { NgModule } from '@angular/core';
import {
  MdButtonModule, MdDialogModule, MdFormFieldModule, MdIconModule, MdInputModule, MdListModule, MdMenuModule,
  MdSelectModule,
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
    MdSelectModule,
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
    MdSelectModule,
  ]
})
export class MaterialModule {
}
