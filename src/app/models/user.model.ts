export class Usuario {
  id: string;
  dni: number;
  first_name: String;
  last_name: String;
  email: string;
  phone: number;
  user_type_id: number;
  constructor() {
    this.id = '';
    this.dni = 0;
    this.first_name = '';
    this.last_name = '';
    this.email = '';
    this.phone = 0;
    this.user_type_id = 0;
  }
}
