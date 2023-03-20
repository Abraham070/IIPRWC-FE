import { Component, OnInit } from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  imageSrc = 'assets/images/crown.png'

  form:FormGroup;

  constructor(private fb:FormBuilder,
              private authService: AuthService,
              private router: Router) {

    this.form = this.fb.group({
      firstName: ["", Validators.required],
      preposition: [""],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ["", Validators.required],
      repeatPassword: ["", Validators.required]
    });

  }

  public loading = false;

  ngOnInit() {
    if(this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/');
    }
  }

  onSubmit() {

    const val = this.form.value;
    if (val.firstName && val.lastName && val.email && val.password && val.password === val.repeatPassword) {
      this.loading = true
      this.authService.signup(val.email, val.password, val.firstName, val.preposition, val.lastName).subscribe({
        next: data => {
          this.loading = false
          this.router.navigateByUrl('/auth/login')
        },
        error: error => {
          this.loading = false
          console.error('There was an error!', error)
        }
      });

    }
  }
}
