import { NgModule } from '@angular/core';
import {
  MdButtonModule, MdCardModule, MdDialogModule, MdExpansionModule, MdFormFieldModule, MdGridListModule, MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdProgressBarModule,
  MdSelectModule,
  MdSidenavModule, MdSliderModule, MdSnackBarModule, MdTableModule,
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
    MdGridListModule,
    MdSliderModule,
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
    MdGridListModule,
    MdSliderModule,
  ]
})
export class MaterialModule {
}
