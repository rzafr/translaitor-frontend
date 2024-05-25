import { Component } from '@angular/core';
import { UserService } from "../../shared/services/user.service";
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

  constructor(private userService: UserService, private router: Router) { }

  onSubmit() {
    this.userService.register(this.user).subscribe({
      next: (data: any) => {
        console.log(data);
        alert('Usuario registrado correctamente');
        this.router.navigate(['/translation']);
      },
      error: (error: any) => {
        console.error('Error register user', error);
      },
      complete: () => {
        console.log('User register completed');
      }
    });
  }
}
