import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  cartCount = 0;
  isLoggedIn = false;
  isAdmin = false;
  fullName = '';

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.cartService.cartCount$.subscribe((count) => {
      this.cartCount = count;
    });

    this.authService.loginStatus$.subscribe(() => {
      this.updateAuthState();
    });

    this.updateAuthState();
  }

  updateAuthState(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.isAdmin = this.authService.isAdmin();
    this.fullName = this.authService.getFullName();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
