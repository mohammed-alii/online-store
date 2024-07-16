import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { product } from '../../models/product';
import { FakeApiService } from './../../services/fake-api.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { cartObj } from '../../models/cart-obj';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent implements OnInit {
  category: any;
  categoryProducts: product[];
  constructor(
    private fakeApiService: FakeApiService,
    private route: ActivatedRoute,
    private cartService: CartService
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
  addToCart(product: product) {
    let _cartObj: cartObj = product;
    _cartObj.quantity = 1
    this.cartService.cartUpdater(_cartObj)
  }
}
