import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth/auth.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const currentTokenValue = this.auth.currentTokenValue;
    const isLoggedIn = currentTokenValue && currentTokenValue.value;
    const isApiUrl = request.url.startsWith(environment.serverUrl(''));

    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentTokenValue.value}`
        }
      });
    }

    return next.handle(request);
  }
}
