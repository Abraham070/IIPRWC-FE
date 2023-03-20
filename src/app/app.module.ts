import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { ProductComponent } from './product/product-page/product.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthInterceptorService} from "./auth-interceptor.service";
import { EditSingleProductComponent } from './product/edit-single-product/edit-single-product.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { EditUsersComponent } from './edit-users/edit-users.component';
import { EditCategoriesComponent } from './category/edit-categories/edit-categories.component';
import { AddCategoriesComponent } from './category/add-categories/add-categories.component';
import { EditSingleCategoryComponent } from './category/edit-single-category/edit-single-category.component';
import { EditPromocodeComponent } from './promocode/edit-promocode/edit-promocode.component';
import { AddPromoCodesComponent } from './promocode/add-promo-codes/add-promo-codes.component';
import { EditSinglePromoCodeComponent } from './promocode/edit-single-promo-code/edit-single-promo-code.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    ShopComponent,
    ProductComponent,
    ShoppingCartComponent,
    AdminDashboardComponent,
    EditProductComponent,
    EditSingleProductComponent,
    AddProductComponent,
    EditUsersComponent,
    EditCategoriesComponent,
    AddCategoriesComponent,
    EditSingleCategoryComponent,
    EditPromocodeComponent,
    AddPromoCodesComponent,
    EditSinglePromoCodeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [{
    provide : HTTP_INTERCEPTORS,
    useClass : AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
