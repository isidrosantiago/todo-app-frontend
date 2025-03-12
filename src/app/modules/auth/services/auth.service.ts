import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthRequest, AuthResponse, User } from '@modules/auth/types/auth';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private apiUrl: string = environment.apiUrl;
  private user = new BehaviorSubject<User | undefined>(undefined);
  user$ = this.user.asObservable();

  constructor() {
    this.setUser();
  }

  signUp(authRequest: AuthRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/auth/sign-up`, authRequest)
      .pipe(
        tap((resp) => {
          localStorage.setItem('user', JSON.stringify(resp.data));
          this.user.next(resp.data);
        })
      );
  }

  signIn(authRequest: AuthRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/auth/sign-in`, authRequest)
      .pipe(
        tap((resp) => {
          localStorage.setItem('user', JSON.stringify(resp.data));
          this.user.next(resp.data);
        })
      );
  }

  setUser() {
    if (!localStorage['user']) return;

    const user: User = JSON.parse(localStorage['user']);
    this.user.next(user);
  }

  signOut() {
    this.router.navigate(['/auth/sign-in']);
    localStorage.clear();
    this.user.next(undefined);
  }
}
