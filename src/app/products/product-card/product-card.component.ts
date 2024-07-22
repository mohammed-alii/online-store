import { Component, Input } from '@angular/core';
import { product } from '../../models/product';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { cartObj } from '../../models/cart-obj';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  id: any
  constructor(
    private cartService: CartService,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.paramMap.get('id')
  }
  @Input() product!: product;

  addToCart(product: product) {
    let _cartObj: cartObj = product;
    _cartObj.quantity = 1
    this.cartService.cartUpdater(_cartObj)
  }
}
