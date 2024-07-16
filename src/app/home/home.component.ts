import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { FakeApiService } from './../services/fake-api.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { product } from '../models/product';
import { CategoriesComponent } from '../products/categories/categories.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, CategoriesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  allProducts: product[];
  constructor(private fakeApiService: FakeApiService) {
    this.allProducts = [];
  }
  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories();
  }

  getAllProducts() {
    this.fakeApiService.getAllProducts().subscribe({
      next: (res: product[]) => {
        console.log(res);
        this.allProducts = res;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }
  getAllCategories() {
    this.fakeApiService.getAllCategories().subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }
}
