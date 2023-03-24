import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../../models/product.model";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../auth.service";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";
@Component({
  selector: 'app-edit-product-page',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  private baseUrl = environment.base_url;

  constructor(private http: HttpClient, private toastr: ToastrService, private authService: AuthService, private router: Router) { }
  products: Product[]=[];
  ngOnInit() {
    if(!this.authService.isAdmin()) {
      this.router.navigateByUrl('/');
    }
    this.getProducts();
  }

  getProducts() {
    this.http.get<Product[]>(this.baseUrl + '/api/v1/products').pipe()
      .subscribe(product => {
          this.products = product;
        }
      )
  }

  removeProduct(productID : String) {
    this.http.delete<Product>(this.baseUrl + '/api/v1/products/' + productID).subscribe(() => {
      this.ngOnInit();
      this.toastr.success('Successfully deleted!', 'Product deleted!');
    })
  }
}
