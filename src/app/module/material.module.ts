import { NgModule } from '@angular/core';
import {
  MdButtonModule, MdCardModule, MdDialogModule, MdExpansionModule, MdFormFieldModule, MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdProgressBarModule,
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
    MdProgressBarModule,
    MdExpansionModule,
    MdCardModule
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
    MdProgressBarModule,
    MdExpansionModule,
    MdCardModule
  ]
})
export class MaterialModule {
}
