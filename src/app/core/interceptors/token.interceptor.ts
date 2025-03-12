import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, shareReplay, switchMap, take } from 'rxjs';
import { AuthService } from '@modules/auth/services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private authService = inject(AuthService);

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user$.pipe(
      take(1),
      switchMap((user) => {
        if (user) {
          request = request.clone({
            setHeaders: { Authorization: `Bearer ${user.token}` },
          });
        }
        return next.handle(request);
      })
    );
  }
}
