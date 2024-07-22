import { CarouselModule } from 'ngx-owl-carousel-o';
import { FakeApiService } from './../../services/fake-api.service';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CarouselModule, RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  categories: string[];

  constructor(private fakeApiService: FakeApiService) {
    this.categories = [];
  }
  ngOnInit(): void {
    this.getCategories();
  }
  getCategories() {
    this.fakeApiService.getAllCategories().subscribe({
      next: (res: string[]) => {
        this.categories = res;
      },
    });
  }

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplaySpeed: 700,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['&lsaquo;', '&rsaquo;'],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    nav: true,
  };
}
