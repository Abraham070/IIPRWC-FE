import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Product} from "../../models/product.model";
import {CartService} from "../../cart.service";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../environments/environment";



@Component({
  selector: 'app-product-page',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  product: Product = {} as Product;
  quantity: number = 1;
  private baseUrl = environment.base_url;


  constructor(private route: ActivatedRoute, private http: HttpClient, private cartService: CartService, private toastr: ToastrService) { }

 ngOnInit() {
   this.cartService.initCart();
    let productId!: number;
    this.route.params.subscribe(params => {
      productId = params['id'];
    });
   this.getProduct(productId);
 }

  getProduct(productId: number) {
    this.http.get<Product>(this.baseUrl + '/api/v1/products/' + productId).subscribe((res) => {
       this.product = res;
    })
  }

  addQuantity() {
    this.quantity++;
  }

  subtractQuantity() {
    if (this.quantity == 1 || this.quantity < 1) {
      this.quantity = 1;
      this.toastr.error("Negative numbers", "Error")

    } else
    {
      this.quantity--;
    }
    }

  addToCart() {if (this.quantity == 1 || this.quantity < 1) {
    this.quantity = 1;
    this.toastr.error("Negative numbers", "Error")

  } else
  {
    this.cartService.addToCart(this.product.id, this.quantity);
    }
  }


}
