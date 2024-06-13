import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-update-modal',
  templateUrl: './user-update-modal.component.html',
  styleUrls: ['./user-update-modal.component.css']
})
export class UserUpdateModalComponent {

  @Input() user = {
    id: 0,
    username: '',
    firstName: '',
    lastName: '',
    dateOfBirth: new Date(),
    email: '',
    phoneNumber: '',
    roles: []
  };

  constructor(public activeModal: NgbActiveModal, private userService: UserService) {}

  onSubmit(): void {
    this.userService.updateUser(this.user).subscribe({
      next: (data: any) => {
        this.activeModal.close(data); // Returns updated data
      },
      error: (error: any) => {
      }
    });
  }

  onCancel(): void {
    this.activeModal.dismiss('cancel');
  }

}
