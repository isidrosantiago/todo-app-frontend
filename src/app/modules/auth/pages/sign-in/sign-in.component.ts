import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';
import { AuthRequest } from '@modules/auth/types/auth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  onSubmit(signUpRequest: AuthRequest) {
    this.authService.signIn(signUpRequest).subscribe({
      next: (data) => {
        this.toastr.success(data.message, 'Sign in');
        this.router.navigate(['/to-do']);
      },
      error: (e: HttpErrorResponse) => {
        this.toastr.error(e.error.message, 'Sign in');
      },
    });
  }
}
