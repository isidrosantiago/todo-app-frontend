import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';
import { map } from 'rxjs';

export const todoCanMatch: CanMatchFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.user$.pipe(
    map((user) => {
      if (!user) {
        router.navigate(['/auth/sign-up']);
        return false;
      }

      return true;
    })
  );
};
