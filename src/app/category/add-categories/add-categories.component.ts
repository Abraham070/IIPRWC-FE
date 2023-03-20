import { Component, OnInit } from '@angular/core';
import {Category} from "../../models/category.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AdminService} from "../../admin.service";
import {AuthService} from "../../auth.service";

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.scss']
})
export class AddCategoriesComponent implements OnInit {
  category: Category = {} as Category;
  public loading = false;
  form:FormGroup;




  constructor(private toastr: ToastrService, private fb:FormBuilder, private router: Router, private http: HttpClient, private authService: AuthService, private adminService: AdminService) {

    this.form = this.fb.group({
      name: ["", Validators.required],
    });
  }
  ngOnInit(): void {
    if(!this.authService.isAdmin()) {
      this.router.navigateByUrl('/');
    }
  }


  onSubmit() {

    const val = this.form.value;
    if (this.form.valid) {
      this.loading = true
      this.adminService.createCategory(val.name).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigateByUrl('/admin/edit-categories');
          this.toastr.success('Succesvol het category aangemaakt!', 'Category Aangemaakt!')
        },
        error: error => {
          this.loading = false;
          console.error('There was an error!', error);
        }
      });

    } else {
      console.log('There was an error! Form invalid!');
    }
  }

}
