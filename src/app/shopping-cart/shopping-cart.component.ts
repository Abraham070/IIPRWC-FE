import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../models/product.model";
import {AuthService} from "../auth.service";
import {CartService} from "../cart.service";
import {environment} from "../../environments/environment";
import {AdminService} from "../admin.service";
import {PromoCode} from "../models/promoCode.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  private baseUrl = environment.base_url;

  constructor(private http: HttpClient, private authService: AuthService, private cartService: CartService, private adminService: AdminService, private fb:FormBuilder, private toastr:ToastrService) {
    this.form = this.fb.group({
      name: ["", Validators.required]
    })
  }

  promocodes: PromoCode[] = []
  products: Product[] = [];
  totalCost: number = 0;
  totalProducts: number = 0;
  cart: any[] = [];
  form:FormGroup;
  buttonDisabled = false;



  ngOnInit() {
  this.loadCart();
  this.getPromocodes()
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

  getPromocodes(){
    this.http.get<PromoCode[]>(this.baseUrl + '/api/v1/promocodes').pipe()
    .subscribe(res => {
        this.promocodes = res;
      }
    )}
  applyPromo(){
    const val = this.form.value
    let applied = false;
    for (let i = 0; i < this.promocodes.length; i++) {
      if (val.name === this.promocodes[i].name) {
        this.totalCost = this.totalCost * (1 - (this.promocodes[i].korting.valueOf()/100));
        applied=true;
        this.buttonDisabled = true;
        this.toastr.success("PROMO APPLIED")
        break;
      }
    }
    if(!applied){this.toastr.error("FOUTE PROMO")}
  }

  getProduct(productId: String, quantity:number) {
    this.http.get<Product>(this.baseUrl + '/api/v1/products/' + productId).subscribe((res) => {
      res.quantity = quantity;
      res.totalPrice = (res.price * quantity);
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
    if (productQuantity == 1 || productQuantity < 1) {
      productQuantity = 1;
      this.cartService.addToCart(productID, productQuantity -= 1);

    } else
    {
      this.cartService.addToCart(productID, productQuantity -= 1);
      this.loadCart();
    }
  }

}
