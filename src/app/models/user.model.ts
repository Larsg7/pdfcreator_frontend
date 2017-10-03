import { Template, TemplateApiModel } from './template.model';

export interface UserApiModel {
  id?: number;
  name?: string;
  role?: string;
  template?: TemplateApiModel;
  templates?: TemplateApiModel[];
}

export class User {
  static fromApi(r: UserApiModel): User {
    if (!r) return null;
    return new User(
      r.id,
      r.name,
      r.role,
      Template.fromApi(r.template),
      r.templates ? r.templates.map(t => Template.fromApi(t)) : [],
    );
  }

  public toApi(): UserApiModel {
    return {
      id: this.id,
      name: this.name,
      role: this.role,
      template: this.template,
      templates: this.templates,
    };
  }

  constructor(public id: number | undefined,
              public name: string | undefined,
              public role: string | undefined,
              public template: Template | undefined,
              public templates: Template[] | undefined) {
  }
}
