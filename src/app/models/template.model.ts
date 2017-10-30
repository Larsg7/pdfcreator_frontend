import { TemplateField, TemplateFieldApiModel } from './template-fields';

export interface TemplateApiModel {
  id?: number;
  name?: string;
  description?: string;
  document?: string;
  fields?: TemplateFieldApiModel[];
}

export class Template {
  static fromApi(r: TemplateApiModel): Template {
    if (!r) return null;
    return new Template(
      r.id,
      r.name,
      r.description,
      r.document,
      r.fields ? [r.fields.map(f => TemplateField.fromApi(f))] : null,
    );
  }

  public toApi(): TemplateApiModel {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      document: this.document,
      fields: this.fields ? this.fields.map(f => f.map(_ => _.toApi()))[0] : null,
    };
  }

  constructor(public id: number | undefined,
              public name: string | undefined,
              public description: string | undefined,
              public document: string | undefined,
              public fields: TemplateField[][] | undefined) {
  }
}
