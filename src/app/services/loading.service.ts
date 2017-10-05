import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/delay';

export interface LoadingTracker {
  requestAdded: () => void;
  requestCompleted: () => void;
}

@Injectable()
export class LoadingService implements LoadingTracker {
  private openRequests = new BehaviorSubject(0);
  private subscriptions = new Subscription();

  private set sink(sub: Subscription) {
    this.subscriptions.add(sub);
  }

  constructor() {
  }

  public addRequest(req: Observable<any>) {
    if (req) {
      let requestDone = false;
      this.requestAdded();
      const timeout = setTimeout(() => {
        this.requestCompleted();
      }, 30000);
      this.sink = req.subscribe(_next => {
        clearTimeout(timeout);
        if (!requestDone) {
          this.requestCompleted();
        }
        requestDone = true;
      }, _err => {
        clearTimeout(timeout);
        if (!requestDone) {
          this.requestCompleted();
        }
        requestDone = true;
      });
    } else {
      this.openRequests.next(0);
    }
  }

  public requestCompleted() {
    // setTimeout needed to avoid change detection errors in angular dev
    setTimeout(() => {
      this.openRequests.next(Math.max(this.openRequests.getValue() - 1, 0));
    }, 0);
  }

  public requestAdded() {
    // setTimeout needed to avoid change detection errors in angular dev
    setTimeout(() => {
      this.openRequests.next(this.openRequests.getValue() + 1);
    }, 0);
  }

  public get isLoading(): Observable<boolean> {
    return this.openRequests.map(c => c > 0);
  }
}
