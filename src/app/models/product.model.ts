import {Category} from "./category.model";

export class Product{
  id: String;
  stock: number;
  price: number;
  shortDescription: string;
  description: string;
  category: Category;
  name: string;
  imageSrc: String;
  totalPrice?: number;
  quantity?: number;


  constructor(id: String, stock: number, price: number, shortDescription: string, description: string, category: Category, name: string, imageSrc: String, totalPrice?: number,   quantity?: number) {
    this.id = id;
    this.stock = stock;
    this.price = price;
    this.shortDescription = shortDescription;
    this.description = description;
    this.category = category;
    this.name = name;
    this.imageSrc = imageSrc;
    this.totalPrice = totalPrice;
    this.quantity = quantity;
  }
}
