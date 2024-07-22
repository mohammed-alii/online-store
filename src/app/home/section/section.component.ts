import { product } from './../../models/product.d';
import { Component, Input } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ProductCardComponent } from '../../products/product-card/product-card.component';

@Component({
  selector: 'home-section',
  standalone: true,
  imports: [CarouselModule, ProductCardComponent],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss',
})
export class SectionComponent {
  @Input() products!: product[];
  @Input() name!: string

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplaySpeed: 700,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 2,
      },
      940: {
        items: 4,
      },
    },
    nav: false,
  };
}
