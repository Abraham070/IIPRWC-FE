import {Injectable} from '@angular/core';
import * as moment from "moment";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Buffer} from "buffer"
import {Router} from "@angular/router";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.base_url;


  constructor(private http: HttpClient, private router :  Router) { }

  private tokenExpiration(token: string) {
    const expiry = (JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('binary'))).exp;
    return expiry;
  }

  signup(email:string, password:string, firstName:string, preposition:string, lastName:string) {
    return this.http.post<HttpResponse<any>>(this.baseUrl + '/api/v1/auth/signup', {email, password, firstName, preposition, lastName})
  }

  login(email:string, password:string) {
    return this.http.post<{accessToken : string,expiresAt : string, userId:any }>(this.baseUrl + '/api/v1/auth/login', {email, password})

  }

  public setSession(authResult : any) {
    const expiresAt = moment().add(this.tokenExpiration(authResult.accessToken),'second');

    localStorage.setItem('id_token', authResult.accessToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    localStorage.setItem("userId", authResult.userId);
    localStorage.setItem("admin", authResult.admin);

  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");

  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  public isAdmin(){
    return localStorage.getItem("admin") === "true"
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration as string);
    return moment(expiresAt);
  }
}
