import { Component } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public user = {
    username: null,
    password: null,
    verifyPassword: null,
    firstName: null,
    lastName: null,
    dateOfBirth: null,
    email: null,
    phoneNumber: null
  }

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.register(this.user).subscribe({
      next: (data: any) => {
        if (data.token) {
          this.authService.loginUser(data.token);
          this.authService.getCurrentUser().subscribe({
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
        }
      },
      error: (error: any) => {
      }
    });
  }
}
