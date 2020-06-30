import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<User>(`${environment.apiUrl}/api/users`);
  }
  getByUsername(username: string) {
    return this.http.get(`${environment.apiUrl}/api/users/` + username);
  }
  register(user: User) {
    return this.http.post(`${environment.apiUrl}/register`, user);
  }
  update(user: User) {
    return this.http.post(`${environment.apiUrl}/api/users`, user);
  }
  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/api/users/` + id);
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }
  usernameExists(username: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/register/username/` + username);
  }
  emailExists(email: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/register/email/` + email);
  }
  public uploadImage(image: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post(`${environment.apiUrl}/api/users/avatar`, formData);
  }


}
