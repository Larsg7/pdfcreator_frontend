import { TemplateFieldApiModel } from './../../models/template-fields';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TableDecoderService } from '../../services/table-decoder.service';
import { TemplateService } from '../../services/template.service';
import { AlertService } from '../../services/alert.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { TemplateField } from '../../models/template-fields';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-template-series-dialog',
  templateUrl: './template-series-dialog.component.html',
  styleUrls: ['./template-series-dialog.component.scss'],
})
export class TemplateSeriesDialogComponent implements OnInit {
  csvFile: File;
  public csvFileKeys: string[] = [];
  public visibleKeys: string[] = [];
  public csvFileJson: any[];

  public fileOk = false;
  public tableDataSubject: ReplaySubject<JSON[]> = new ReplaySubject(1);
  public tableDataSource = new TemplateDataSource(this.tableDataSubject);

  public globalTemplateFields: TemplateField[] = [];

  @ViewChild('fileUpload')
  fileInput: ElementRef;

  constructor(
    private templateService: TemplateService,
    private alert: AlertService,
    public dialogRef: MatDialogRef<TemplateSeriesDialogComponent>
  ) {
    this.getSavedSeries();
  }

  ngOnInit() {}

  chooseFile() {
    this.fileInput.nativeElement.click();
  }

  generate() {
    const templateFields: TemplateField[][] = [];
    this.csvFileJson.forEach(page => {
      const templateField: TemplateField[] = [];
      this.visibleKeys.forEach(key => {
        templateField.push(new TemplateField(key, '', page[key]));
      });
      templateFields.push(templateField.concat(this.globalTemplateFields));
    });

    this.templateService.activeTemplate.fields = templateFields;
    this.templateService.reloadTemplate();
    this.closeDialog();
  }

  onCSVFileChange(event) {
    if (!event || !event.target) {
      return;
    }
    this.csvFile = event.target.files[0];

    const reader: FileReader = new FileReader();

    if (!this.csvFile) {
      return;
    }
    if (this.csvFile.type === '') {
      this.alert.showSnack('Dieser Filetyp wird nicht unterstützt.');
      this.csvFile = null;
      return;
    }

    reader.onload = e => {
      try {
        this.csvFileKeys = TableDecoderService.getKeys(reader.result);
        this.csvFileJson = TableDecoderService.csvToJson(reader.result);
        this.tableDataSubject.next(this.csvFileJson);
        this.fileOk = true;
      } catch (err) {
        this.alert.showSnack(
          'Die Namen der Spalten decken sich nicht mit den vorhandenen Platzhaltern/Variablen!'
        );
      }
    };

    reader.readAsText(this.csvFile);
  }

  exampleCsv() {
    const fields = this.templateService.activeTemplate.fields[0];
    const header = fields.map(field => `"${field.content}"`).join(', ');
    const row = fields.map(_ => '"..."').join(', ');
    return header + '\n' + row + '\n' + row;
  }

  getTemplateKeys() {
    return this.templateService.activeTemplate.fields[0].map(_ => _.content);
  }

  getVisibleKeys() {
    return this.templateService.activeTemplate.fields[0]
      .filter(
        _ => !this.globalTemplateFields.find(__ => __.content === _.content)
      )
      .map(_ => _.content);
  }

  addRow() {
    this.csvFileJson.push(JSON.parse('{}'));
    this.updateTableData();
  }

  deleteRow(element: any) {
    const index = this.csvFileJson.findIndex(_ => _ == element);
    if (index !== -1) {
      this.csvFileJson.splice(index, 1);
    }
    this.tableDataSubject.next(this.csvFileJson);
  }

  createTable() {
    this.setKeys();
    this.csvFileJson = [];
    this.addRow();
  }

  closeDialog() {
    this.saveSeries();
    this.dialogRef.close();
  }

  updateTableData() {
    this.tableDataSubject.next(this.csvFileJson);
  }

  globalFieldsChanged(event) {
    this.globalTemplateFields = event.value.map(
      _ => new TemplateField(_, '', '')
    );
    this.visibleKeys = this.getVisibleKeys();
    this.updateTableData();
  }

  setKeys() {
    this.csvFileKeys = this.getTemplateKeys();
    this.visibleKeys = this.getVisibleKeys();
  }

  reset() {
    this.globalTemplateFields = [];
    this.csvFileJson = [];
    this.csvFileKeys = [];
    this.updateTableData();
  }

  private get jsonLocalStorageKey() {
    return `series-json-${this.templateService.activeTemplate.id}`;
  }

  private get globalLocalStorageKey() {
    return `series-global-${this.templateService.activeTemplate.id}`;
  }

  private saveSeries() {
    localStorage.setItem(
      this.jsonLocalStorageKey,
      JSON.stringify(this.csvFileJson || [])
    );
    localStorage.setItem(
      this.globalLocalStorageKey,
      JSON.stringify(this.globalTemplateFields || [])
    );
  }

  private getSavedSeries() {
    const json = localStorage.getItem(this.jsonLocalStorageKey);
    const global = localStorage.getItem(this.globalLocalStorageKey);
    if (!json || !global) {
      return;
    }
    try {
      this.globalTemplateFields = (JSON.parse(
        global
      ) as TemplateFieldApiModel[]).map(f => TemplateField.fromApi(f));
      this.csvFileJson = JSON.parse(json);
      this.setKeys();
      this.filterJson();
      this.updateTableData();
    } catch (error) {
      console.error(error);
      this.csvFileJson = [];
      this.setKeys();
    }
  }

  private filterJson() {
    this.csvFileJson.forEach(e => {
      for (const key in e) {
        if (e.hasOwnProperty(key)) {
          if (!this.visibleKeys.some(k => k === key)) {
            delete e[key];
          }
        }
      }
    });
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
