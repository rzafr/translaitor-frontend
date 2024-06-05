import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-update-modal',
  templateUrl: './user-update-modal.component.html',
  styleUrls: ['./user-update-modal.component.css']
})
export class UserUpdateModalComponent {

  @Input() user: User = {
    id: 0,
    username: '',
    firstName: '',
    lastName: '',
    dateOfBirth: new Date(),
    email: '',
    phoneNumber: '',
    roles: new Set<string>()
  };

  constructor(public activeModal: NgbActiveModal, private userService: UserService) {}

  onSubmit(): void {
    this.userService.updateUser(this.user).subscribe({
      next: (data: any) => {
        this.activeModal.close(data); // Returns updated data
      },
      error: (error: any) => {
        console.error('User update error');
      },
      complete: () => {
        console.log('User update completed');
      }
    });
  }

  onCancel(): void {
    this.activeModal.dismiss('cancel');
  }

}
