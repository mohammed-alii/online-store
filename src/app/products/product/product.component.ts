import { CartService } from './../../services/cart.service';
import { cartObj } from './../../models/cart-obj.d';
import { FakeApiService } from './../../services/fake-api.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../../models/product';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NgClass, CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  productId: any;
  currentProduct: product;
  stars: number[];
  productRate: number;
  productsQuantity: number;
  totalPrice: number;
  constructor(
    private route: ActivatedRoute,
    private fakeApiService: FakeApiService,
    private cartService: CartService
  ) {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.currentProduct = {} as product;
    this.stars = [1, 2, 3, 4, 5];
    this.productRate = 0;
    this.productsQuantity = 1;
    this.totalPrice = 0;
  }
  ngOnInit(): void {
    this.getProduct();
  }
  getProduct() {
    this.fakeApiService.getProduct(this.productId).subscribe({
      next: (res: product) => {
        this.currentProduct = res;
        console.log(res)
        this.productRate = res.rating.rate;
        this.totalPrice = res.price;
        console.log(this.productRate);
      },
    });
  }
  calculateStarState(index: number): string {
    const fullStars = Math.floor(this.productRate);
    const decimalPart = this.productRate - fullStars;
    if (index < fullStars) {
      return 'filled';
    } else if (index === fullStars && decimalPart >= 0.5) {
      console.log('half');
      return 'half-filled';
    } else {
      return 'empty';
    }
  }
  increaseProducts() {
    this.productsQuantity += 1;
    this.totalPrice += this.currentProduct.price;
  }
  decreaseProducts() {
    if (this.productsQuantity > 1) {
      this.productsQuantity -= 1;
      this.totalPrice -= this.currentProduct.price;
    }
  }
  addToCart(quantity: number) {
    let _cartObj: cartObj = this.currentProduct;
    _cartObj.quantity = quantity
    this.cartService.cartUpdater(_cartObj)
  }
}
