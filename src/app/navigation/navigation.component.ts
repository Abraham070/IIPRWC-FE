import { Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent{
  imageSrc = 'assets/images/crown.png'
  loggedIn = this.authService.isLoggedIn();
  public showMobileMenu = false;

  constructor(private router: Router, private authService: AuthService) { }

  public isAdmin = this.authService.isAdmin();

  logOut(){
    this.authService.logout();
    this.router.navigateByUrl('/auth/login');
  }

}
