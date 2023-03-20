import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  imageSrc = 'assets/images/crown.png'

  form:FormGroup;

  constructor(private fb:FormBuilder,
              private authService: AuthService,
              private router: Router) {

    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['',Validators.required]
    });

  }

  public invalidAuth = false;
  public loading = false;

  ngOnInit() {
    if(this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/');
    }
  }

  handleLogin (){

    const val = this.form.value;

    if (val.email && val.password) {
      this.loading= true
      this.authService.login(val.email, val.password).subscribe({
        next: data => {
          this.authService.setSession(data);
          this.router.navigateByUrl('/');
        },
        error: error => {
          this.loading = false
          this.invalidAuth = true;
        }
      });
    }
  }
}
