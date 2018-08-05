import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user.model';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import { AuthService } from './auth.service';
import { LoadingService } from './loading.service';
import { Subject } from 'rxjs/Subject';
import { Template } from '../models/template.model';
import { AlertService } from './alert.service';
import { TemplateField } from '../models/template-fields';

import * as Raven from 'raven-js';
import { environment } from '../../environments/environment';

@Injectable()
export class ApiService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private loadingService: LoadingService,
    private alert: AlertService
  ) {}

  authorizeV1(username: string, password: string): Observable<[string, User]> {
    const request = this.makeGraphQlQuery(
      `
    mutation {
      mutation {
        authorize(username: "${username}", password: "${password}") {
          token
          user {
            id
            email
            name
            role
            templates {
              id
              name
            }
          }
        }
      }
    }
    `
    )
      .map(r => this.checkForErrors(r))
      .map(res => this.getData(res, 'data', 'mutation', 'authorize'))
      .map(res => (res ? [res.token, User.fromApi(res.user)] : []));
    return this.makeRequest(request);
  }

  activeUserV1(): Observable<User> {
    const request = this.makeGraphQlQuery(
      `
    query {
      query(token: "${this.authService.token}") {
        activeUser {
            id
            email
            name
            role
            templates {
              id
              name
            }
        }
      }
    }
    `
    )
      .map(this.checkForErrors.bind(this))
      .map(res => this.getData(res, 'data', 'query', 'activeUser'))
      .map(User.fromApi);
    return this.makeRequest(request);
  }

  registerUserV1(
    username: string,
    password: string,
    email: string
  ): Observable<number | any> {
    const request = this.makeGraphQlQuery(
      `
    mutation {
      mutation {
        addUser(username: "${username}", password: "${password}", email: "${email}") {
          id
        }
      }
    }
    `
    )
      .map(this.checkForErrors.bind(this))
      .map(res => this.getData(res, 'data', 'mutation', 'addUser'))
      .map(res => (res ? res.id : null));
    return this.makeRequest(request);
  }

  updateUserV1(
    id: number,
    username: string,
    password: string,
    email: string
  ): Observable<User> {
    const request = this.makeGraphQlQuery(
      `
    mutation {
      mutation(token: "${this.authService.token}") {
        updateUser(id: ${id}, username: "${username}", password: "${password}", email: "${email}") {
          id
          email
          name
          role
        }
      }
    }
    `
    )
      .map(this.checkForErrors.bind(this))
      .map(res => this.getData(res, 'data', 'mutation', 'updateUser'))
      .map(res => User.fromApi(res));
    return this.makeRequest(request);
  }

  newTemplateV1(template: Template, id: number | any): Observable<Template> {
    const request = this.makeGraphQlQuery(
      `
    mutation {
      mutation(token: "${this.authService.token}") {
        addTemplate(name: "${template.name}", description: "${
        template.description
      }", idUser: ${id}) {
          id
          name
          description
        }
      }
    }
    `
    )
      .map(this.checkForErrors.bind(this))
      .map(res => this.getData(res, 'data', 'mutation', 'addTemplate'))
      .map(Template.fromApi);
    return this.makeRequest(request);
  }

  getTemplateDetailsV1(
    id: number,
    fields: TemplateField[][] = []
  ): Observable<Template> {
    // source: https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
    function b64EncodeUnicode(str) {
      return btoa(
        encodeURIComponent(str).replace(
          /%([0-9A-F]{2})/g,
          function toSolidBytes(match, p1) {
            return String.fromCharCode(+('0x' + p1));
          }
        )
      );
    }
    const apiFields = fields ? fields.map(f => f.map(_ => _.toApi())) : [];
    const fieldsEncoded = apiFields.length
      ? b64EncodeUnicode(JSON.stringify(apiFields))
      : '';

    const request = this.makeGraphQlQuery(
      `
    query {
      query(token: "${this.authService.token}") {
        template(id: ${id}) {
          id
          name
          description
          document(fields: "${fieldsEncoded}")
          fields
          token
        }
      }
    }
    `
    )
      .map(this.checkForErrors.bind(this))
      .map(res => this.getData(res, 'data', 'query', 'template'))
      .map(Template.fromApi);
    return this.makeRequest(request);
  }

  updateTemplateV1(template: Template): Observable<Template> {
    const request = this.makeGraphQlQuery(
      `
    mutation {
      mutation(token: "${this.authService.token}") {
        updateTemplate(id: ${template.id}, name: "${
        template.name
      }", description: "${template.description}") {
          id
          name
          description
        }
      }
    }
    `
    )
      .map(this.checkForErrors.bind(this))
      .map(res => this.getData(res, 'data', 'mutation', 'updateTemplate'))
      .map(Template.fromApi);
    return this.makeRequest(request);
  }

  deleteTemplateV1(template: Template): Observable<Template> {
    const request = this.makeGraphQlQuery(
      `
    mutation {
      mutation(token: "${this.authService.token}") {
        removeTemplate(id: ${template.id}) {
          ok
        }
      }
    }
    `
    ).map(this.checkForErrors.bind(this));
    return this.makeRequest(request);
  }

  getBackendVersion(): Observable<{ version: string }> {
    return this.httpClient
      .get(`${environment.API_URL}/api/v1/version`)
      .catch(this.handleError);
  }

  downloadTemplateLinkV1(template): Observable<string> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authService.token}`
    );
    const request = this.httpClient
      .get(`${environment.API_URL}/api/v1/document/download/${template.id}`, {
        headers: headers,
      })
      .map((res: { link: string }) => res.link);
    return this.makeRequest(request);
  }

  private makeGraphQlQuery(query: string): Observable<any> {
    return this.httpClient.post(`${environment.API_URL}/api/v1/graphql`, query);
  }

  private getData(res: any, ...keys) {
    keys.forEach(k => (res = res ? res[k] : res));
    return res;
  }

  private handleError(error: Error | string) {
    const message = error instanceof Error ? error.message : error;
    if (error instanceof Error) {
      Raven.captureException(error);
    } else {
      Raven.captureMessage(error);
    }
    console.error(message);
    this.alert.showError(message);
    return Observable.throw(error);
  }

  private checkForErrors(res) {
    if (res && res.errors) {
      this.handleError(new Error(JSON.stringify(res.errors)));
    }
    return res;
  }

  private makeRequest(req: Observable<any>): Observable<any> {
    return req.trackLoading(this.loadingService);
  }
}
