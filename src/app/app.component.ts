import { Component } from '@angular/core';
import { ThemeService } from './services/theme.service';
import { AlertService } from './services/alert.service';
import { FeedbackDialogComponent } from './dialogs/feedback-dialog/feedback-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(public theme: ThemeService,
              private alert: AlertService) {
  }

  openFeedbackDialog() {
    this.alert.showDialog(FeedbackDialogComponent, {});
  }
}
