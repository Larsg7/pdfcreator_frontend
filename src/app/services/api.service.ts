import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { CONFIG } from '../../config';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AuthService } from './auth.service';
import { LoadingService } from './loading.service';
import { Subject } from 'rxjs/Subject';
import { Template } from '../models/template.model';
import { AlertService } from './alert.service';

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
    `).map(this.checkForErrors)
      .map(res => this.getData(res, 'data', 'mutation', 'authorize'))
      .map(res => res ? [res.token, User.fromApi(res.user)] : [])
      .catch(this.handleError);
    return this.makeRequest(request);
  }

  activeUserV1(): Observable<User> {
    const request = this.makeGraphQlQuery(`
    query {
      query(token: "${this.authService.token}") {
        activeUser {
            id
            name
            role
            templates {
              id
              name
            }
        }
      }
    }
    `).map(this.checkForErrors)
      .map(res => this.getData(res, 'data', 'query', 'activeUser'))
      .map(User.fromApi)
      .catch(this.handleError);
    return this.makeRequest(request);
  }

  registerUserV1(username: string, password: string): Observable<number | null> {
    const request = this.makeGraphQlQuery(`
    mutation {
      mutation {
        addUser(username: "${username}", password: "${password}") {
          id
        }
      }
    }
    `).map(this.checkForErrors)
      .map(res => this.getData(res, 'data', 'mutation', 'addUser'))
      .map(res => res ? res.id : null)
      .catch(this.handleError);
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
    `).map(this.checkForErrors)
      .map(res => this.getData(res, 'data', 'mutation', 'addTemplate'))
      .map(Template.fromApi)
      .catch(this.handleError);
    return this.makeRequest(request);
  }

  getTemplateDetailsV1(id: number): Observable<Template> {
    const request = this.makeGraphQlQuery(`
    query {
      query(token: "${this.authService.token}") {
        template(id: ${id}) {
          id
          name
          description
          document
        }
      }
    }
    `).map(this.checkForErrors)
      .map(res => this.getData(res, 'data', 'query', 'template'))
      .map(Template.fromApi)
      .catch(this.handleError);
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
    `).map(this.checkForErrors)
      .map(res => this.getData(res, 'data', 'mutation', 'updateTemplate'))
      .map(Template.fromApi)
      .catch(this.handleError);
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
    `).map(this.checkForErrors)
      .catch(this.handleError);
    return this.makeRequest(request);
  }

  private makeGraphQlQuery(query: string): Observable<any> {
    return this.httpClient.post(`${CONFIG.API_URL}/api/v1/graphql`, query);
  }

  private getData(res: any, ...keys) {
    keys.forEach(k => res = res ? res[k] : res);
    return res;
  }

  private handleError(error) {
    console.error(error);
//    this.alert.showError(error);
    return Observable.throw(error);
  }

  private checkForErrors(res) {
    if (res && res.errors) {
      throw new Error(JSON.stringify(res.errors));
    }
    return res;
  }

  private makeRequest(req: Observable<any>): Observable<any> {
    const loadingSub = new Subject();
    const request = Observable.create(observer => {
      req.subscribe(
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
