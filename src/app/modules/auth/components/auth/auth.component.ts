import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { AuthRequest } from '@modules/auth/types/auth';

@Component({
  selector: 'auth-form',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  private fb = inject(NonNullableFormBuilder);

  @Input() title: string = '';
  @Output() formData = new EventEmitter<AuthRequest>();

  authForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  });

  onSubmit() {
    if (this.authForm.invalid) return;
    const formData = this.authForm.getRawValue();
    this.formData.emit(formData);
  }
}
