import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { environment} from '../../environments/environment';
import {Subject} from 'rxjs';

@Injectable()
export class AuthenticationService {

  public currentUser = new Subject();

  constructor(private http: HttpClient) {}

  login(userName: string, pass: string) {
    return this.http.post<any>(`${environment.apiUrl}/api/login_check`, { username: userName, password: pass })
      .pipe(map(user => {

        if (user && user.token) {

          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUser.next(user);
        } else {
          this.currentUser.next(null);
        }
        return user;
      })
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUser.next(null);
  }
}
