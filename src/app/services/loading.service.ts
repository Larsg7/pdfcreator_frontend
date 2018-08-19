import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/delay';

export interface ILoadingStatus {
  isLoading: Observable<boolean>;
}

export interface ILoadingTracker {
  requestAdded: () => void;
  requestCompleted: () => void;
}

export class LoadingTracker implements ILoadingTracker, ILoadingStatus {
  private openRequests = new BehaviorSubject(0);

  constructor() {}

  public isLoading: Observable<boolean> = this.openRequests.map(c => c > 0);

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

  get isCurrentlyLoading(): boolean {
    return this.openRequests.getValue() > 0;
  }
}

@Injectable()
export class LoadingService extends LoadingTracker {
  constructor() {
    super();
  }
}

export class LoadingSubscriber implements ILoadingTracker {
  private complete = false;

  constructor(private loadingService: ILoadingTracker) {}

  public requestCompleted() {
    if (!this.complete) {
      this.loadingService.requestCompleted();
      this.complete = true;
    }
  }

  public requestAdded() {
    this.loadingService.requestAdded();
    this.complete = false;
  }
}

function trackLoading<T>(this: Observable<T>, loadingService: ILoadingTracker) {
  const loadingSub = new LoadingSubscriber(loadingService);
  return Observable.create(subscriber => {
    loadingSub.requestAdded();
    return this.subscribe(
      value => {
        try {
          subscriber.next(value);
        } catch (err) {
          subscriber.error(err);
        }
        loadingSub.requestCompleted();
      },
      err => {
        subscriber.error(err);
        loadingSub.requestCompleted();
      },
      () => {
        subscriber.complete();
        loadingSub.requestCompleted();
      }
    );
  });
}

Observable.prototype.trackLoading = trackLoading;

declare module 'rxjs/Observable' {
  interface Observable<T> {
    trackLoading: typeof trackLoading;
  }
}
