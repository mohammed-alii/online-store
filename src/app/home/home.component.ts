import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { FakeApiService } from './../services/fake-api.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { product } from '../models/product';
import { CategoriesComponent } from '../products/categories/categories.component';
import { SectionComponent } from './section/section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    CategoriesComponent,
    SectionComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  allProducts: product[];
  bestSellers: product[];
  newArrivals: product[];
  constructor(private fakeApiService: FakeApiService) {
    this.allProducts = [];
    this.bestSellers = [];
    this.newArrivals = [];
  }
  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.fakeApiService.getAllProducts().subscribe({
      next: (res: product[]) => {
        this.allProducts = res;
        this.getBestSellers(res)
        this.getNewArrivals(res)
      }
    });
  }
  getBestSellers(allProducts: product[]) :void {
    this.bestSellers = this.randomizeFiveProducts(0, allProducts.length, allProducts);
  }
  getNewArrivals(allProducts: product[]): void {
    this.newArrivals = this.randomizeFiveProducts(0, allProducts.length, allProducts);
  }
  randomizeFiveProducts(
    min: number,
    max: number,
    allProducts: product[]
  ) :product[] {
    let selectedProducts: product[] = [];
    for (let i = 1; i <= 5; i++) {
      let product = allProducts[Math.floor(Math.random() * (max - min + 1) + min)]
      if (product) {
        selectedProducts.push(product);
        console.log(selectedProducts)
      }
    }
    return selectedProducts;
  }
}
