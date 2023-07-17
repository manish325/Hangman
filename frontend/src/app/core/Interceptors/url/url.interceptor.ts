import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { local } from 'src/environments/environment';

@Injectable()
export class UrlInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   request = request.clone({
      url : local + request.url,
      setHeaders : {
        'Content-Type' : 'application/json'
      }
    })
    return next.handle(request);
  }
}
