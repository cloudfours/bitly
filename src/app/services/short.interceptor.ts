import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ShortInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const TOKEN='be03dcf5e3ce629b6aa2d4acfac687b2ed57cd21'
    request=request.clone({setHeaders:{Authorization:'Bearer '+TOKEN}})
    return next.handle(request).pipe(catchError((error=>{
      console.log(error)
      return throwError(error)
    })));
  }
}
