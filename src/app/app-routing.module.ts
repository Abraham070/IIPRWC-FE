import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {HomeComponent} from "./home/home.component";
import {ShopComponent} from "./shop/shop.component";
import {ProductComponent} from "./product/product-page/product.component";
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";
import {AdminDashboardComponent} from "./admin-dashboard/admin-dashboard.component";
import {EditProductComponent} from "./product/edit-product/edit-product.component";
import {EditSingleProductComponent} from "./product/edit-single-product/edit-single-product.component";
import {AddProductComponent} from "./product/add-product/add-product.component";
import {EditUsersComponent} from "./edit-users/edit-users.component";
import {EditCategoriesComponent} from "./category/edit-categories/edit-categories.component";
import {AddCategoriesComponent} from "./category/add-categories/add-categories.component";
import {EditSingleCategoryComponent} from "./category/edit-single-category/edit-single-category.component";
import {EditPromocodeComponent} from "./promocode/edit-promocode/edit-promocode.component";
import {AddPromoCodesComponent} from "./promocode/add-promo-codes/add-promo-codes.component";
import {EditSinglePromoCodeComponent} from "./promocode/edit-single-promo-code/edit-single-promo-code.component";

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'auth/login', component: LoginComponent},
  { path: 'auth/signup', component: SignupComponent},
  { path: 'shop', component: ShopComponent},
  { path: 'product/:id', component: ProductComponent},
  { path: 'cart', component: ShoppingCartComponent},
  { path: 'admin-dashboard', component: AdminDashboardComponent},
  { path: 'admin/edit-products', component: EditProductComponent},
  { path: 'admin/edit/product/:id', component: EditSingleProductComponent},
  { path: 'admin/edit/category/:id', component: EditSingleCategoryComponent},
  { path: 'admin/add-product', component: AddProductComponent},
  { path: 'admin/edit-users', component: EditUsersComponent},
  { path: 'admin/edit-categories', component: EditCategoriesComponent},
  { path: 'admin/edit-promocodes', component: EditPromocodeComponent},
  { path: 'admin/add-category', component: AddCategoriesComponent},
  { path: 'admin/add-promocode', component: AddPromoCodesComponent},
  { path: 'admin/edit-users/:id', component: EditUsersComponent},
  { path: 'admin/edit/promoCode/:id', component: EditSinglePromoCodeComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
