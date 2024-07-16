import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './products/categories/categories.component';
import { CategoryComponent } from './products/category/category.component';
import { ProductComponent } from './products/product/product.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'categories', component: CategoriesComponent},
  {path: ':id', component: CategoryComponent},
  {path: ':id/:id', component: ProductComponent}
];
