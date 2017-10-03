import { NgModule } from '@angular/core';
import {
  MdButtonModule, MdIconModule, MdListModule, MdMenuModule, MdSidenavModule,
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
  ],
  exports: [
    MdButtonModule,
    MdSidenavModule,
    MdIconModule,
    MdMenuModule,
    MdListModule,
    MdToolbarModule,
  ]
})
export class MaterialModule {
}
