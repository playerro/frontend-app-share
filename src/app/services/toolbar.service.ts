import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export class ToolbarService {
  private title = new BehaviorSubject<string>('Обмен приложениями');
  private title$ = this.title.asObservable();

  constructor() {}

  setTitle(title: string) {
    this.title.next(title);
  }

  getTitle(): Observable<string> {
    return this.title$;
  }
}
