import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';
import { map } from 'rxjs';

export const authCanActivate: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.user$.pipe(
    map((user) => {
      if (user) {
        router.navigate(['/to-do']);
        return false;
      }

      return true;
    })
  );
};
