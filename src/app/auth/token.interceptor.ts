import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
// import { Http2ServerResponse } from 'http2';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.auth.getToken();
    console.log('$--$',"auhToken from interceptor = ",authToken);
    
    if(authToken){
      //original 
      request = request.clone({
        setHeaders : { Authorization: `${authToken}` }
      });
    }
    console.log(5879,'request = ',request);
    return next.handle(request).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }
}
