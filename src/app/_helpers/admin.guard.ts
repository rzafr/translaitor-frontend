import { Injectable } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn && this.authService.isAdmin()) {
      return true; // The user is authenticated and has the admin role
    } else {
      // If he is not authenticated or not an admin, redirect to access denied page
      this.router.navigate(['/access-denied']);
      return false;
    }
  }
}
