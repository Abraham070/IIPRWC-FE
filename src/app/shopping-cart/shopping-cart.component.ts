import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../models/product.model";
import {AuthService} from "../auth.service";
import {CartService} from "../cart.service";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  private baseUrl = environment.base_url;

  constructor(private http: HttpClient, private authService: AuthService, private cartService: CartService) {
  }


  products: Product[] = [];
  totalCost: number = 0;
  totalProducts: number = 0;
  cart: any[] = [];
  ngOnInit() {
  this.loadCart();
  }

  loadCart() {
    this.cartService.initCart();
    this.cart = this.cartService.getCart();

    this.products = [];
    this.totalCost = 0;
    this.totalProducts = 0;

    for (let i = 0; i < this.cart.length; i++) {
      this.getProduct(this.cart[i].productID, this.cart[i].quantity);
    }
  }


  getProduct(productId: String, quantity:number) {
    this.http.get<Product>(this.baseUrl + '/api/v1/products/' + productId).subscribe((res) => {
      res.quantity = quantity;
      res.totalPrice = res.price * quantity;
      this.totalProducts += res.quantity;
      this.totalCost += res.totalPrice;
      this.products.push(res);
    })
  }

  removeItem(productID: String) {
    this.cartService.removeFromCart(productID);
    this.loadCart();
  }

  addQuantity(productQuantity: any, productID: String) {
    this.cartService.addToCart(productID, productQuantity += 1);
    this.loadCart();
  }

  subtractQuantity(productQuantity: any, productID: String) {
    this.cartService.addToCart(productID, productQuantity -= 1);
    this.loadCart();
  }

}
