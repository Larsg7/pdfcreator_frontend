import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatExpansionModule, MatFormFieldModule, MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressBarModule,
  MatSelectModule,
  MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatTableModule,
  MatToolbarModule, MatTooltipModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatSelectModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatCardModule,
    MatTooltipModule,
    MatTableModule,
    MatGridListModule,
    MatSliderModule,
    MatSlideToggleModule,
  ],
  exports: [
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatToolbarModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatSelectModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatCardModule,
    MatTooltipModule,
    MatTableModule,
    MatGridListModule,
    MatSliderModule,
    MatSlideToggleModule,
  ]
})
export class MaterialModule {
}
