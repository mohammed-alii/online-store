import { CartService } from './../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  cartData: any;
  totalPrice: number;
  constructor(private cartService: CartService) {
    this.cartData = this.getCartData();
    this.totalPrice = 0
  }
  ngOnInit(): void {
    this.getTotalPrice()
  }
  getCartData(): any {
    this.cartData = window.localStorage.getItem('cartItems')
    JSON.parse(this.cartData)
    return JSON.parse(this.cartData)
  }
  adjustCartData(productId: number, method: string) {
    this.cartData.forEach((product: any, index: number) => {
      if (product.id === productId) {
        if (product.quantity === 1 && method === 'decrease') {
          // delete product from the array
          this.cartData.splice(index, 1);
        } else if (product.quantity > 1 && method === 'decrease') {
          product.quantity -= 1
        } else product.quantity += 1
      }
    });
    this.getTotalPrice()
    this.updateCartData(this.cartData)
  }
  getTotalPrice() {
    this.totalPrice = 0
    this.cartData.forEach((product: any) => {
      this.totalPrice += product.price * product.quantity;
    });
  }
  updateCartData(data: any) {
    this.cartService.reAssignCartData(data)
  }
}
