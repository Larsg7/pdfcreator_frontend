import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultPipe } from './default.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DefaultPipe,
  ],
  exports: [
    DefaultPipe
  ]
})
export class PipesModule { }
