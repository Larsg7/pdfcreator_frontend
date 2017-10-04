import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { CONFIG } from '../../config';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AuthService } from './auth.service';
import { LoadingService } from './loading.service';

@Injectable()
export class ApiService {

  constructor(private httpClient: HttpClient,
              private authService: AuthService,
              private loadingService: LoadingService) {
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
    this.loadingService.addRequest(request);
    return request;
  }

  activeUserV1(): Observable<User> {
    return this.makeGraphQlQuery(`
    query {
      query(token: "${this.authService.token}") {
        activeUser {
            id
            name
            role
            templates {
              name
            }
        }
      }
    }
    `).map(this.checkForErrors)
      .map(res => this.getData(res, 'data', 'query', 'activeUser'))
      .map(User.fromApi)
      .catch(this.handleError);
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
    return Observable.throw(error);
  }

  private checkForErrors(res) {
    if (res && res.errors) {
      throw new Error(JSON.stringify(res.errors));
    }
    return res;
  }
}
