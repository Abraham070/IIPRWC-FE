import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {Category} from "../../models/category.model";
import {AuthService} from "../../auth.service";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-edit-categories',
  templateUrl: './edit-categories.component.html',
  styleUrls: ['./edit-categories.component.scss']
})
export class EditCategoriesComponent implements OnInit {
  private baseUrl = environment.base_url;

  constructor(private http: HttpClient, private toastr: ToastrService, private authService: AuthService, private router: Router) { }
  categories: Category[]=[];
  ngOnInit() {
    if(!this.authService.isAdmin()) {
      this.router.navigateByUrl('/');
    }
    this.getCategories();
  }

  getCategories() {
    this.http.get<Category[]>(this.baseUrl + '/api/v1/categories').pipe()
      .subscribe(category => {
          this.categories = category;
        }
      )
  }

  removeCategory(categoryID : String) {
      this.http.delete<Category>(this.baseUrl + '/api/v1/categories/' + categoryID).subscribe(  {
        next: () => {
        this.ngOnInit();
        this.toastr.success('Successfully deleted!', 'Category deleted!');
      },
        error: () => {
          this.toastr.error('There are products using this category!', 'Conflict!');
        }
        });

  }
}
