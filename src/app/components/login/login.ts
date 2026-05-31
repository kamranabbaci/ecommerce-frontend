import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { Login as LoginModel } from '../../models/login';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  model: LoginModel = {
    email: '',
    password: '',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}

  login(): void {
    this.authService.login(this.model).subscribe({
      next: (response) => {
        this.authService.saveUser(response);

        if (response.role === 'Admin') {
          this.router.navigate(['/admin/products']);
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/products']);
        }
      },
      error: (err) => {
        console.error(err);
        this.toastService.show('Invalid email or password', 'danger');
      },
    });
  }
}
