import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Token } from '../../data/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<Token>;
  private currentUser: Observable<Token>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Token>(JSON.parse(localStorage.getItem('currentToken')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentTokenValue(): Token {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<Token>(environment.serverUrl('/login'), { username, password })
        .pipe(map(token => {
          localStorage.setItem('currentToken', JSON.stringify(token));
          this.currentUserSubject.next(token);
          return token;
        }));
  }

  logout() {
    localStorage.removeItem('currentToken');
    this.currentUserSubject.next(null);
  }
}
