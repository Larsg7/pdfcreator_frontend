import { Injectable } from '@angular/core';
import { MdDialog, MdSnackBar } from '@angular/material';
import { ErrorDialogComponent } from '../dialogs/error-dialog/error-dialog.component';

@Injectable()
export class AlertService {

  constructor(private snackBar: MdSnackBar,
              private dialog: MdDialog) {
  }

  showSnack(text: string, code = 1) {
    const duration = code === 0 ? 9000 : 5000;
    this.snackBar.open(text, 'Schließen', {
      duration: duration,
    });
  }

  showError(message: string) {
    return this.showDialog(ErrorDialogComponent, {message: message});
  }

  showDialog(component: any, data: any, disableClose = false): Promise<any> {
    return new Promise((res, rej) => {
      const dialog = this.dialog.open(component, {
        data: data,
        disableClose: disableClose
      });
      dialog.afterClosed().subscribe(result => {
        res(result);
      });
    });
  }
}
