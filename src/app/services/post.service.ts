import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Post} from '../models/post';
import {Observable} from 'rxjs';

@Injectable()
export class PostService {
  constructor(private http: HttpClient) {}

  getUserPosts(username: string, page: number) {
    return this.http.get(`${environment.apiUrl}/api/posts/` + username + '/' + page);
  }

  sendPost(text: Post) {
    return this.http.post(`${environment.apiUrl}/api/posts`, text);
  }
}
