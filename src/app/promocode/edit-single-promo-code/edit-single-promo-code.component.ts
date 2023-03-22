import { Component, OnInit } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../auth.service";
import {AdminService} from "../../admin.service";
import {environment} from "../../../environments/environment";
import {PromoCode} from "../../models/promoCode.model";


@Component({
  selector: 'app-edit-single-promo-code',
  templateUrl: './edit-single-promo-code.component.html',
  styleUrls: ['./edit-single-promo-code.component.scss']
})
export class EditSinglePromoCodeComponent implements OnInit {
  private baseUrl = environment.base_url;

  promocode: PromoCode = {} as PromoCode;
  public loading = false;
  form:FormGroup;

  constructor(private toastr: ToastrService, private fb:FormBuilder, private router: Router, private http: HttpClient, private adminService: AdminService, private authService: AuthService, private route: ActivatedRoute) {
    this.form = this.fb.group({
      name: ["", Validators.required],
      korting: ["", Validators.required]
    });
  }

  ngOnInit(): void {
    if(!this.authService.isAdmin()) {
      this.router.navigateByUrl('/');
    }
    let promoId!: String;
    this.route.params.subscribe(params => {
      promoId = params['id'];
    });
    this.getPromo(promoId);
  }

  getPromo(promoId: String) {
    this.http.get<PromoCode>(this.baseUrl + '/api/v1/promocodes/' + promoId).subscribe((res) => {
      this.promocode = res;
      this.form.setValue({
        name: this.promocode.name,
        korting: this.promocode.korting,
      });
    })
  }

  onSubmit(){
    const val = this.form.value;
    if (this.form.valid) {
      this.loading = true
      console.log(val);
      this.adminService.editPromoCode(this.promocode.id, val.name, val.korting).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigateByUrl('/admin/edit-promocodes');
          this.toastr.success('Successfully changed!', 'Promocode changed!')
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
