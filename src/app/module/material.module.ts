import { NgModule } from '@angular/core';
import {
  MdButtonModule, MdCardModule, MdDialogModule, MdExpansionModule, MdFormFieldModule, MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdProgressBarModule,
  MdSelectModule,
  MdSidenavModule, MdSnackBarModule, MdTableModule,
  MdToolbarModule, MdTooltipModule
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
    MdCardModule,
    MdTooltipModule,
    MdTableModule,
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
    MdCardModule,
    MdTooltipModule,
    MdTableModule,
  ]
})
export class MaterialModule {
}
