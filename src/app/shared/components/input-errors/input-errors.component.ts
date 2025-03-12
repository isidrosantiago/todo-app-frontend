import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'input-errors[control]',
  templateUrl: './input-errors.component.html',
  styleUrls: ['./input-errors.component.css'],
})
export class InputErrorsComponent<T> {
  @Input() control!: FormControl<T>;

  errorMessages: Record<string, string> = {
    required: 'This field is required',
    email: 'Please enter a valid email address',
    minlength: 'Minimum length is not met',
  };

  getErrorMessage(errorKey: string, errorValue?: any): string {
    if (errorKey === 'minlength') {
      return `Minimum length required is ${errorValue.requiredLength}`;
    }
    return this.errorMessages[errorKey] || 'Invalid field';
  }
}
