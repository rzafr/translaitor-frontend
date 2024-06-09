import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { UserService } from '../../shared/services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserUpdateModalComponent } from '../user-update-modal/user-update-modal.component';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  users: User[] = [];
  currentPage: number = 0;
  pageSize: number = 5;
  totalPages: number = 0;
  totalItems: number = 0;

  constructor(private userService: UserService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getUsersPaged(this.currentPage, this.pageSize).subscribe({
      next: (data: any) => {
        this.users = data.users;
        this.currentPage = data.currentPage;
        this.totalItems = data.totalItems;
        this.totalPages = data.totalPages;
      },
      error: (error: any) => {
        console.error('Error fetching users', error);
      },
      complete: () => {
        console.log('User fetching completed');
      }
    });
  }

  setPage(page: number, event: Event): void {
    event.preventDefault();
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.getAllUsers();
    }
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

  deleteUserById(id: any): void {
    if (confirm('Confirme la eliminación del usuario')) {
      this.userService.deleteUserById(id).subscribe({
        next: () => {
          this.getAllUsers();
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
