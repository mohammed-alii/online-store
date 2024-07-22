import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './products/categories/categories.component';
import { CategoryComponent } from './products/category/category.component';
import { ProductComponent } from './products/product/product.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './account/login/login.component';
import { ShopModalComponent } from './shop-modal/shop-modal.component';
import { ProfileComponent } from './account/profile/profile.component';
import { CheckoutComponent } from './account/checkout/checkout.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'categories', component: CategoriesComponent},
  {path: 'categories/:id', component: CategoryComponent},
  {path: 'categories/:id/:id', component: ProductComponent},
  {path: 'cart', component: CartComponent},
  {path: 'login', component: LoginComponent},
  {path: 'modal', component: ShopModalComponent},
  {path: 'users/:id', component: ProfileComponent},
  {path: 'checkout', component: CheckoutComponent}
];
