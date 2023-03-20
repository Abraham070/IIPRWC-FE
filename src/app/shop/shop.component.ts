import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../models/product.model";
import {environment} from "../../environments/environment";


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  private baseUrl = environment.base_url;

  constructor(private http: HttpClient) { }
  products: Product[]=[];
  ngOnInit() {
    this.getProducts()
  }

  getProducts() {
    this.http.get<Product[]>(this.baseUrl + '/api/v1/products').pipe()
      .subscribe(product => {
        this.products = product
      }
     )
  }
}
