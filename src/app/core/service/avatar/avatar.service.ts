import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../data/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  constructor(private http: HttpClient) { }

  getAvatar(user: User): Observable<Blob> {
    return this.http.get(user._links.avatar.href, { responseType: 'blob' });
  }
}
