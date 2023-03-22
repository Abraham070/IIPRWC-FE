import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  homeImageSrc = 'assets/images/home.png'
  loggedIn = this.authService.isLoggedIn();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

}
