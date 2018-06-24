import { Injectable } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ErrorDialogComponent } from '../dialogs/error-dialog/error-dialog.component';
@Injectable()
export class AlertService {

  constructor(private snackBar: MatSnackBar,
              private dialog: MatDialog) {
  }

  showSnack(text: string, code = 1) {
    const duration = code === 0 ? 9000 : 5000;
    this.snackBar.open(text, 'Schließen', {
      duration: duration,
    });
  }

  showError(rawError: string) {
    const errorRegex = new RegExp('E(\\d{4})');
    const match = errorRegex.exec(rawError);
    let message = '';
    if (match && match.length >= 2) {
      const errorCode = match[1];
      message = this.getErrorForCode(errorCode);
    }
    console.log(match, errorRegex)
    return this.showDialog(ErrorDialogComponent, {rawError, message});
  }

  private getErrorForCode(errorCode: string) {
    switch (errorCode) {
      case "1000":
        return "Dieser Login existiert bereits.";
      case "1010":
        return "Login oder Password inkorrekt."
      case "2000":
        return "Es gab einen Fehle bei der Latex Kompilierung."
      default:
        return '';
    }
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
