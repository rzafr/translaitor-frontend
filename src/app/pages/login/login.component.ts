import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public user = {
    email: null,
    password: null
  }

  constructor(private userService: UserService, private router: Router) { }

  onSubmit() {
    this.userService.login(this.user).subscribe({
      next: (data: any) => {
        console.log(data);
        alert('Usuario logueado correctamente');
        this.router.navigate(['/translation']);
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
