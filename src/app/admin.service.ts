import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest, HttpResponse} from "@angular/common/http";
import {Product} from "./models/product.model";
import {Category} from "./models/category.model";
import {PromoCode} from "./models/promoCode.model";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = environment.base_url;

  constructor(private http: HttpClient) { }

  editProduct(id: String, name:String, price:Number, stock:Number, category:Category, shortDescription:String, description: String, imageSrc: String) {
    return this.http.patch<HttpResponse<any>>(this.baseUrl + '/api/v1/products/' + id, {id, name, price, stock, category, shortDescription, description, imageSrc})
  }

  editCategory(id: String, name:String) {
    return this.http.patch<HttpResponse<any>>(this.baseUrl + '/api/v1/categories/' + id, {id, name})
  }

  editPromoCode(id: String, name:String, korting:Number) {
    return this.http.patch<HttpResponse<any>>(this.baseUrl + '/api/v1/promocodes/' + id, {id, name, korting})
  }

  createProduct(name:String, price:Number, stock:Number, category:Category, shortDescription:String, description: String, imageSrc: String) {
    return this.http.post<Product>(this.baseUrl + '/api/v1/products', {name, price, stock, category, shortDescription, description, imageSrc})
  }

  createCategory(name:String) {
    return this.http.post<Category>(this.baseUrl + '/api/v1/categories', {name})
  }

  createPromoCode(name:String, korting:Number) {
    return this.http.post<PromoCode>(this.baseUrl + '/api/v1/promocodes', {name, korting})
  }


  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }
}
