import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/login.service';

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

  constructor(private loginService: LoginService, private router: Router) { }

  onSubmit() {
    this.loginService.login(this.user).subscribe({
      next: (data: any) => {
        console.log(data);
        alert('Usuario logueado correctamente');
        if (data.token) {
          this.loginService.loginUser(data.token);
          this.loginService.getCurrentUser().subscribe((user: any) => {
            this.loginService.setUser(user)
            console.log(user);

            if (this.loginService.getUserRole() == "ADMIN")
              this.router.navigate(['/admin']);
            else
              this.router.navigate(['/translation']);
          })
        }

      },
      error: (error: any) => {
        console.error('Error login', error);
      },
      complete: () => {
        console.log('Login completed');
      }
    });
  }
}
