import { Component, OnInit } from '@angular/core';
import {Product} from "../../models/product.model";
import {Category} from "../../models/category.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../auth.service";
import {AdminService} from "../../admin.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-edit-single-category',
  templateUrl: './edit-single-category.component.html',
  styleUrls: ['./edit-single-category.component.scss']
})
export class EditSingleCategoryComponent implements OnInit {
  private baseUrl = environment.base_url;

  category: Category = {} as Category;
  public loading = false;
  form:FormGroup;




  constructor(private toastr: ToastrService, private fb:FormBuilder, private router: Router, private route: ActivatedRoute, private http: HttpClient, private authService: AuthService, private adminService: AdminService) {

    this.form = this.fb.group({
      name: ["", Validators.required],
    });
  }
  ngOnInit(): void {
    if(!this.authService.isAdmin()) {
      this.router.navigateByUrl('/');
    }
    let categoryId!: String;
    this.route.params.subscribe(params => {
      categoryId = params['id'];
    });
    this.getCategory(categoryId);

  }

  getCategory(categoryId: String) {
    this.http.get<Category>(this.baseUrl + '/api/v1/categories/' + categoryId).subscribe((res) => {
      this.category = res;
      this.form.setValue({
        name: this.category.name,
      });
    })
  }


  onSubmit() {

    const val = this.form.value;
    if (this.form.valid) {
      this.loading = true
      console.log(val);
      this.adminService.editCategory(this.category.id, val.name).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigateByUrl('/admin/edit-categories');
          this.toastr.success('Successfully changed!', 'Category changed!')
        },
        error: error => {
          this.loading = false;
          console.error('There was an error!', error);
        }
      });

    } else {
      console.log('There was an error! Form invalid!');
      this.toastr.error("Form is not valid")
    }
  }

}
