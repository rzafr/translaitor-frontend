import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  /**
   * If the access token exists, it injects it into the requests headers of the current session
   * @param req
   * @param next
   * @returns
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('accessToken');
    if (token) {
      // If token exists, the original request is cloned and an Authorization HTTP header is added with the value Bearer ${token}
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      // The cloned and modified request is sent to the next handler in the interceptor chain
      return next.handle(cloned);
    } else {
      // If there is no token in the localStorage, the original request is sent without modification
      return next.handle(req);
    }
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
