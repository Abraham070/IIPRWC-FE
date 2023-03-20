export class User{
  id: number;
  email: number;
  firstName: string;
  preposition: string;
  lastName: string;
  createDate: string;


  constructor(id: number, email: number, firstName: string, preposition: string, lastName: string, createDate: string) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.preposition = preposition;
    this.lastName = lastName;
    this.createDate = createDate;
  }
}
