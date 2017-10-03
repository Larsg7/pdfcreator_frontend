export interface TemplateApiModel {
  id?: number;
  name?: string;
  description?: string;
  document?: string;
}

export class Template {
  static fromApi(r: TemplateApiModel): Template {
    if (!r) return null;
    return new Template(
      r.id,
      r.name,
      r.description,
      r.document,
    );
  }

  public toApi(): TemplateApiModel {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      document: this.document,
    };
  }

  constructor(public id: number | undefined,
              public name: string | undefined,
              public description: string | undefined,
              public document: string | undefined) {
  }
}
