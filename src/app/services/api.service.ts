import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user.model';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { CONFIG } from '../../config';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AuthService } from './auth.service';
import { LoadingService } from './loading.service';
import { Subject } from 'rxjs/Subject';
import { Template } from '../models/template.model';
import { AlertService } from './alert.service';
import { TemplateField } from '../models/template-fields';

@Injectable()
export class ApiService {

  constructor(private httpClient: HttpClient,
              private authService: AuthService,
              private loadingService: LoadingService,
              private alert: AlertService) {
  }

  authorizeV1(username: string, password: string): Observable<[string, User]> {
    const request = this.makeGraphQlQuery(`
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
    `).map(this.checkForErrors.bind(this))
      .map(res => this.getData(res, 'data', 'mutation', 'authorize'))
      .map(res => res ? [res.token, User.fromApi(res.user)] : []);
    return this.makeRequest(request);
  }

  activeUserV1(): Observable<User> {
    const request = this.makeGraphQlQuery(`
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
    `).map(this.checkForErrors.bind(this))
      .map(res => this.getData(res, 'data', 'query', 'activeUser'))
      .map(User.fromApi);
    return this.makeRequest(request);
  }

  registerUserV1(username: string, password: string, email: string): Observable<number | any> {
    const request = this.makeGraphQlQuery(`
    mutation {
      mutation {
        addUser(username: "${username}", password: "${password}", email: "${email}") {
          id
        }
      }
    }
    `).map(this.checkForErrors.bind(this))
      .map(res => this.getData(res, 'data', 'mutation', 'addUser'))
      .map(res => res ? res.id : null);
    return this.makeRequest(request);
  }

  updateUserV1(id: number, username: string, password: string, email: string): Observable<User> {
    const request = this.makeGraphQlQuery(`
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
    `).map(this.checkForErrors.bind(this))
      .map(res => this.getData(res, 'data', 'mutation', 'updateUser'))
      .map(res => User.fromApi(res));
    return this.makeRequest(request);
  }

  newTemplateV1(template: Template, id: number | any): Observable<Template> {
    const request = this.makeGraphQlQuery(`
    mutation {
      mutation(token: "${this.authService.token}") {
        addTemplate(name: "${template.name}", description: "${template.description}", idUser: ${id}) {
          id
          name
          description
        }
      }
    }
    `).map(this.checkForErrors.bind(this))
      .map(res => this.getData(res, 'data', 'mutation', 'addTemplate'))
      .map(Template.fromApi);
    return this.makeRequest(request);
  }

  getTemplateDetailsV1(id: number, fields: TemplateField[] = []): Observable<Template> {
    const apiFields = fields ? fields.map(f => f.toApi()) : [];
    // FIXME
    const fieldsJson = JSON.stringify(apiFields).replace(/"/g, '\\"')
      .replace(/content/g, 'Content')
      .replace(/replacement/g, 'Replacement')
      .replace(/comment/g, 'Comment');

    const request = this.makeGraphQlQuery(`
    query {
      query(token: "${this.authService.token}") {
        template(id: ${id}) {
          id
          name
          description
          document(fields: "${fieldsJson}")
          fields
        }
      }
    }
    `).map(this.checkForErrors.bind(this))
      .map(res => this.getData(res, 'data', 'query', 'template'))
      .map(Template.fromApi);
    return this.makeRequest(request);
  }

  updateTemplateV1(template: Template): Observable<Template> {
    const request = this.makeGraphQlQuery(`
    mutation {
      mutation(token: "${this.authService.token}") {
        updateTemplate(id: ${template.id}, name: "${template.name}", description: "${template.description}") {
          id
          name
          description
        }
      }
    }
    `).map(this.checkForErrors.bind(this))
      .map(res => this.getData(res, 'data', 'mutation', 'updateTemplate'))
      .map(Template.fromApi);
    return this.makeRequest(request);
  }

  deleteTemplateV1(template: Template): Observable<Template> {
    const request = this.makeGraphQlQuery(`
    mutation {
      mutation(token: "${this.authService.token}") {
        removeTemplate(id: ${template.id}) {
          ok
        }
      }
    }
    `).map(this.checkForErrors.bind(this));
    return this.makeRequest(request);
  }

  downloadTemplateLinkV1(template): Observable<string> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.token}`);
    const request = this.httpClient.get(`${CONFIG.API_URL}/api/v1/document/download/${template.id}`, {
      headers: headers
    }).map((res: {link: string}) => res.link);
    return this.makeRequest(request);
  }

  private makeGraphQlQuery(query: string): Observable<any> {
    return this.httpClient.post(`${CONFIG.API_URL}/api/v1/graphql`, query);
  }

  private getData(res: any, ...keys) {
    keys.forEach(k => res = res ? res[k] : res);
    return res;
  }

  private handleError(error: Error) {
    console.error(error.message);
    this.alert.showError(error.message);
  }

  private checkForErrors(res) {
    if (res && res.errors) {
      this.handleError(new Error(JSON.stringify(res.errors)));
    }
    return res;
  }

  private makeRequest(req: Observable<any>): Observable<any> {
    const loadingSub = new Subject();
    const request = Observable.create(observer => {
      req
        .catch(this.handleError.bind(this))
        .subscribe(
          res => {
            observer.next(res);
            loadingSub.next();
          },
          err => {
            loadingSub.next();
            observer.error(err);
          },
          () => {
            observer.complete();
            loadingSub.next();
          }
        );
    });
    this.loadingService.addRequest(loadingSub);

    return request;
  }


}
