export class PromoCode {
  id: String;
  name: String;
  korting:Number;



  constructor(id: String, name: String, korting:Number) {
    this.id = id;
    this.name = name;
    this.korting = korting;
  }
}
