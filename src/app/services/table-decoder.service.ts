import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class TableDecoderService {

  constructor() { }

  public static csvToJson(csv: string, expectedKeys?: string[]): JSON[] {
    const result = [];
    const lines = csv.split('\n');
    let keys: string[];
    for (const line of lines) {
      if (!line) continue;
      // Get the keys
      if (!keys && line[0] !== ',') {
        keys = TableDecoderService.removeQuotesAndWhitespaces(line.split('",'));
        if (expectedKeys) {
          if (expectedKeys.length !== keys.length) throw new Error('Keys do not match!');
          _.each(expectedKeys, k => {
            if (keys.indexOf(k) === -1) throw new Error('Keys do not match!');
          });
        }
        continue;
      }
      // Generate result
      const data = TableDecoderService.removeQuotesAndWhitespaces(line.split('",'));
      const lineJson = {};
      _.each(keys, (k, i) => {
        lineJson[k] = data[i];
      });
      result.push(lineJson);
    }
    return JSON.parse(JSON.stringify(result));
  }

  public static getKeys(csv: string): string[] {
    const lines = csv.split('\n');
    for (const line of lines) {
      if (line[0] !== ',') {
        return TableDecoderService.removeQuotesAndWhitespaces(line.split('",'));
      }
    }
  }

  public static removeQuotesAndWhitespaces(array: string[]): string[] {
    const re = new RegExp('^"|"$', 'g');
    const result = array;
    _.each(result, (value, i, arr) => {
      arr[i] = arr[i].trim().replace(re, '');
    });
    return result;
  }

}
