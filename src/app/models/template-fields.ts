export interface TemplateFieldApiModel {
  content: string;
  comment: string;
  replacement: string;
}

export class TemplateField {
  static fromApi(r: TemplateFieldApiModel): TemplateField {
    if (!r) return null;
    return new TemplateField(
      r.content,
      r.comment,
      r.replacement,
    );
  }

  public toApi(): TemplateFieldApiModel {
    return {
      content: this.content,
      comment: this.description,
      replacement: this.replacement,
    };
  }

  constructor(public content: string,
              public description: string,
              public replacement: string) {
  }
}
