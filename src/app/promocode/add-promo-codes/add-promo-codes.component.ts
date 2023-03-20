import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AdminService} from "../../admin.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-add-promo-codes',
  templateUrl: './add-promo-codes.component.html',
  styleUrls: ['./add-promo-codes.component.scss']
})
export class AddPromoCodesComponent implements OnInit {
  private baseUrl = environment.base_url;
  public loading = false;
  form:FormGroup;




  constructor(private toastr: ToastrService, private fb:FormBuilder, private router: Router, private http: HttpClient, private adminService: AdminService) {

    this.form = this.fb.group({
      name: ["", Validators.required],
      korting: ["", Validators.required]
    });
  }
  ngOnInit(): void {
  }


  onSubmit() {

    const val = this.form.value;
    if (this.form.valid && (val.korting>0)) {
      this.loading = true
      this.adminService.createPromoCode(val.name, val.korting).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigateByUrl(this.baseUrl + '/admin/edit-promocodes');
          this.toastr.success('Succesvol het promoCode aangemaakt!', 'Promo-code created!')
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
