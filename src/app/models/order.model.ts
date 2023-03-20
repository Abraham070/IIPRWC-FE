import {Product} from "./product.model";
import {User} from "./user.model";

export class Order{
  id: String;
  product: Product[];
  user: User;


  constructor(id: String, product: Product[], user: User) {
    this.id = id;
    this.product = product;
    this.user = user;
  }
}
