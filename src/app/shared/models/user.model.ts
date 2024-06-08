export interface User {
  id?: number;
  username: string;
  password?: string,
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  email: string;
  phoneNumber?: string;
  roles: string[];
  createdAt?: Date;
  lastPasswordChangeAt?: Date;
}
