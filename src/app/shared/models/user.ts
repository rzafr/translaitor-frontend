export class User {
  constructor(
    public id: number,
    public username: string,
    public password: string,
    public firstName: string,
    public lastName: string,
    public dateOfBirth: Date,
    public email: string,
    public phoneNumber: string,
    public roles: Set<string>,
    public createdAt: Date,
    public lastPasswordChangeAt: Date
  ) {}
}
