import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { ToastService } from '../../services/toast';
import { Register as RegisterModel } from '../../models/register';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  model: RegisterModel & { confirmPassword?: string } = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  isSubmitting = false;

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router,
  ) {}

  passwordsDoNotMatch(): boolean {
    return (
      !!this.model.password &&
      !!this.model.confirmPassword &&
      this.model.password !== this.model.confirmPassword
    );
  }

  register(form: NgForm): void {
    if (form.invalid) {
      this.toastService.show('Please fill all required fields correctly', 'warning');
      return;
    }

    if (this.passwordsDoNotMatch()) {
      this.toastService.show('Passwords do not match', 'warning');
      return;
    }

    this.isSubmitting = true;

    const registerData: RegisterModel = {
      fullName: this.model.fullName.trim(),
      email: this.model.email.trim(),
      password: this.model.password,
    };

    this.authService.register(registerData).subscribe({
      next: (response) => {
        this.authService.saveUser(response);
        this.toastService.show('Registration successful', 'success');
        this.router.navigate(['/products']);
      },
      error: (err) => {
        console.error(err);
        this.toastService.show('Registration failed. Email may already exist.', 'danger');
        this.isSubmitting = false;
      },
    });
  }
}
