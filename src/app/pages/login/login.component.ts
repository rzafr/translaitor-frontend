import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public user = {
    username: null,
    password: null
  }

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.login(this.user).subscribe({
      next: (data: any) => {
        if (data.token) {
          this.authService.loginUser(data.token);
          this.authService.setUser(data);
              this.authService.isLoggedIn = true;
              if (this.authService.getUserRole() == "admin")
                this.router.navigate(['/admin']);
              else
                this.router.navigate(['/user-dashboard']);
        }
      },
      error: (error: any) => {
      }
    });
  }
}
/**
 * this.authService.getCurrentUser().subscribe({
            next: (data: any) => {
              this.authService.setUser(data);
              this.authService.isLoggedIn = true;
              if (this.authService.getUserRole() == "admin")
                this.router.navigate(['/admin']);
              else
                this.router.navigate(['/user-dashboard']);
            },
            error: (error: any) => {
            }
          });
 */
