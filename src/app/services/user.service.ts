import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api.service';
import { Subject } from 'rxjs/Subject';
import { User } from '../models/user.model';

@Injectable()
export class UserService {

  user: Subject<User> = new Subject();

  constructor(private api: ApiService) { }

  login(username: string, password: string): Observable<any> {
    return Observable.create(obs => {
      this.api.authorizeV1(username, password).subscribe(
        user => {
          this.user.next(user);
          obs.next();
        },
        error => {

        }
      )
    })
  }
}
