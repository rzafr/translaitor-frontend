import { Injectable } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn) {
      return true; // The user is authenticated
    } else {
      // If he is not authenticated, redirect to access denied
      this.router.navigate(['/access-denied']);
      return false;
    }
  }
}
