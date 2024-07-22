import { Component, OnInit } from '@angular/core';
import { product } from '../../models/product';
import { FakeApiService } from './../../services/fake-api.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [RouterLink, ProductCardComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent implements OnInit {
  category: any;
  categoryProducts: product[];
  constructor(
    private fakeApiService: FakeApiService,
    private route: ActivatedRoute
  ) {
    this.category = this.route.snapshot.paramMap.get('id');
    this.categoryProducts = [];
  }
  ngAfterContentChecked(): void {
    if (this.route.snapshot.paramMap.get('id') !== this.category) {
      this.category = this.route.snapshot.paramMap.get('id');
      this.getCategoryProducts();
    }
  }
  ngOnInit(): void {
    this.getCategoryProducts();
  }
  getCategoryProducts() {
    this.fakeApiService.getCategoryProducts(this.category).subscribe({
      next: (res: product[]) => {
        this.categoryProducts = res;
      },
    });
  }
}
