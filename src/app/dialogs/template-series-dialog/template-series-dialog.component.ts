import { Component, OnInit } from '@angular/core';
import { TableDecoderService } from '../../services/table-decoder.service';
import { TemplateService } from '../../services/template.service';
import { AlertService } from '../../services/alert.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { TemplateField } from '../../models/template-fields';
import { Template } from '../../models/template.model';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-template-series-dialog',
  templateUrl: './template-series-dialog.component.html',
  styleUrls: ['./template-series-dialog.component.scss']
})
export class TemplateSeriesDialogComponent implements OnInit {

  csvFile: File;
  private csvFileKeys: string[];
  private csvFileJson: JSON[];

  public fileOk = false;
  public tableDataSubject: ReplaySubject<JSON[]> = new ReplaySubject(1);
  public tableDataSource = new TemplateDataSource(this.tableDataSubject);

  constructor(private templateService: TemplateService,
              private alert: AlertService,
              public dialogRef: MdDialogRef<TemplateSeriesDialogComponent>) { }

  ngOnInit() {
  }

  generate() {
    const templateFields: TemplateField[][] = [];
    this.csvFileJson.forEach(page => {
      const templateField: TemplateField[] = [];
      this.csvFileKeys.forEach(key => {
        templateField.push(new TemplateField(key, '', page[key]));
      });
      templateFields.push(templateField);
    });
    this.templateService.activeTemplate.fields = templateFields;
    this.templateService.reloadTemplate();
    this.dialogRef.close();
  }

  onCSVFileChange(event) {
    this.csvFile = event.srcElement.files[0];

    const reader: FileReader = new FileReader();

    if (!this.csvFile) {
      return;
    }
    if (!this.csvFile.type.match(/text.*/)) {
      this.alert.showSnack('Dieser Filetyp wird nicht unterstützt.');
      this.csvFile = null;
      return;
    }

    reader.onload = (e) => {
      try {
        this.csvFileKeys = TableDecoderService.getKeys(reader.result);
        this.csvFileJson = TableDecoderService.csvToJson(reader.result, this.templateService.activeTemplate.fields[0].map(_ => _.content));
        this.tableDataSubject.next(this.csvFileJson);
        console.log(this.csvFileKeys, this.csvFileJson);
        this.fileOk = true;
      } catch (err) {
        this.alert.showSnack('Die Namen der Spalten decken sich nicht mit den vorhandenen Platzhaltern/Variablen!');
      }
    };

    reader.readAsText(this.csvFile);
  }

}

export class TemplateDataSource extends DataSource<any> {
  constructor(private data: ReplaySubject<any>) {
    super();
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Element[]> {
    return this.data.asObservable();
  }

  disconnect() {}
}
