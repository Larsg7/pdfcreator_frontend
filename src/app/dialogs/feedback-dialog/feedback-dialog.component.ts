import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { MatDialogRef } from '@angular/material';
import { AlertService } from '../../services/alert.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-feedback-dialog',
  templateUrl: './feedback-dialog.component.html',
  styleUrls: ['./feedback-dialog.component.scss']
})
export class FeedbackDialogComponent implements OnInit {

  public formGroup: FormGroup;
  public typeCtrl = new FormControl('', Validators.required);
  public readonly types = ['Support Anfrage', 'Fehler Report', 'Verbesserungsvorschlag', 'Etwas anderes'];

  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<FeedbackDialogComponent>,
              private alert: AlertService,
              private http: Http) {
    this.formGroup = formBuilder.group({
        name: [''],
        type: this.typeCtrl,
        feedback: ['', Validators.required]
      }
    );
  }

  ngOnInit() {
  }

  send() {
    if (this.formGroup.invalid) {
      return;
    }

    const name = this.formGroup.get('name').value;
    const type = this.formGroup.get('type').value;
    const feedback = this.formGroup.get('feedback').value;

    this.http.post(`${environment.API_URL}/api/v1/feedback`, {
      Name: name,
      Type: type,
      Feedback: feedback,
    }).subscribe(() => {
      this.alert.showSnack('Vielen Dank für dein Feedback!');
      this.dialogRef.close();
    }, error => {
      this.alert.showSnack('Leider ist ein Fehler aufgetreten.');
      this.dialogRef.close();
    })
  }
}
