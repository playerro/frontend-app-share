import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {App, AppSort} from '../models/app-type';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private http: HttpClient) {}

  getSelfApps(sort: AppSort) {
    let httpParams = new HttpParams();
    Object.keys(sort).forEach(key => {
      httpParams = httpParams.append(key, sort[key]);
    });
    return this.http.get(`${environment.apiUrl}/api/apps`, {params: httpParams});
  }
  postApp(application: App): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/apps`, application);
  }

  domainExists(domain: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/apps/` + domain);
  }
  deleteApp(application: App): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/apps/` + application.id);
  }
}
