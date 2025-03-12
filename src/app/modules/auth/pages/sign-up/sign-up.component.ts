import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';
import { AuthRequest } from '@modules/auth/types/auth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  onSubmit(signUpRequest: AuthRequest) {
    this.authService.signUp(signUpRequest).subscribe({
      next: (data) => {
        this.toastr.success(data.message, 'Sign up');
        this.router.navigate(['/to-do']);
      },
      error: (e: HttpErrorResponse) => {
        this.toastr.error(e.error.message, 'Sign up');
      },
    });
  }
}
