export class LogIn {
  grant_type: String;
  username: string;
  password: string;

  constructor() {
    this.grant_type = '';
    this.username = '';
    this.password = '';
  }
}
