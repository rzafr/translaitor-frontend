import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/user';
import { UserService } from '../../shared/services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserUpdateModalComponent } from '../user-update-modal/user-update-modal.component';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  users: User[] = [ ];

  constructor(private userService: UserService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.fetchAllUsers();
  }

  fetchAllUsers() {
    this.userService.getUsers().subscribe({
      next: (data: User[]) => {
        this.users = data;
      },
      error: (error: any) => {
        console.error('Error fetching users', error);
      },
      complete: () => {
        console.log('User fetching completed');
      }
    });
  }

  openUpdateModal(user: User) {
    const modalRef = this.modalService.open(UserUpdateModalComponent);
    modalRef.componentInstance.user = { ...user }; // Pass a copy of the user to avoid unwanted changes

    modalRef.result.then((result) => {
      if (result) {
        this.userService.updateUser(result).subscribe(updatedUser => {
          // Update the user list with the updated user
          const index = this.users.findIndex(u => u.id === updatedUser.id);
          if (index !== -1) {
            this.users[index] = updatedUser;
          }
        });
      }
    });
  }

  deleteUserById(id: number): void {
    if (confirm('Confirme la eliminación del usuario')) {
      this.userService.deleteUserById(id).subscribe({
        next: () => {
          this.fetchAllUsers();
        },
        error: (error: any) => {
          console.error('Error deleting user', error);
        },
        complete: () => {
          console.log('User deleting completed');
        }
      });
    }
  }
}
