export class User {

  id?: number;
  username: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  email: string;
  phoneNumber: string;
  roles: Set<string>;
  createdAt?: Date;
  lastPasswordChangeAt?: Date;

  constructor(id: number, username: string, firstName: string, lastName: string, dateOfBirth: Date,
    email: string, phoneNumber: string, roles: Set<string>, createdAt: Date, lastPasswordChangeAt: Date) {

    this.id = id;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.roles = roles;
    this.createdAt = createdAt;
    this.lastPasswordChangeAt = lastPasswordChangeAt;

  }

}
