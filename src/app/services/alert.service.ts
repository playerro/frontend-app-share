import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {NavigationStart, Router} from '@angular/router';

@Injectable()
export class AlertService {
  private subject = new Subject<any>();
  private keepAfterNavigationChange = false;

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {

          this.keepAfterNavigationChange = false;
        } else {

          this.subject.next();
        }
      }
    });
  }

  success(message: string, keepAfterNavigaionChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigaionChange;
    this.subject.next({type: 'success', text: message});
  }
  error(message: string, keepAfterNavigaionChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigaionChange;
    this.subject.next({type: 'error', text: message});
  }
  getMessage() {
    return this.subject.asObservable();
  }
}
