import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let changedRequest = request;

    const headerSettings: {[name: string]: string | string[]; } = {};
    for (const key of request.headers.keys()) {
      headerSettings[key] = request.headers.getAll(key);
    }

    if (currentUser && currentUser.token) {
      headerSettings.Authorization = 'Bearer ' + currentUser.token;
    }

    const newHeader = new HttpHeaders(headerSettings);
    changedRequest = request.clone({headers: newHeader});
    return next.handle(changedRequest);
  }
}
