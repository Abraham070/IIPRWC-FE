import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../auth.service";
import {Router} from "@angular/router";
import {PromoCode} from "../../models/promoCode.model";
import {environment} from "../../../environments/environment";
@Component({
  selector: 'app-edit-promocode',
  templateUrl: './edit-promocode.component.html',
  styleUrls: ['./edit-promocode.component.scss']
})
export class EditPromocodeComponent implements OnInit {
  private baseUrl = environment.base_url;

  constructor(private http: HttpClient, private toastr: ToastrService, private authService: AuthService, private router: Router) { }
  promoCodes: PromoCode[]=[];

  ngOnInit() {
    if(!this.authService.isAdmin()) {
      this.router.navigateByUrl('/');
    }
    this.getPromoCodes();
  }

  getPromoCodes() {
    this.http.get<PromoCode[]>(this.baseUrl + '/api/v1/promocodes').pipe()
      .subscribe(promocode => {
          this.promoCodes = promocode;
        }
      )
  }

  removePromoCode(promoID : String) {
    this.http.delete<PromoCode>(this.baseUrl + '/api/v1/promocodes/' + promoID).subscribe( () => {
        this.ngOnInit();
        this.toastr.success('Successfully deleted!', 'Promocode deleted!');
      }
    )

  }
}
