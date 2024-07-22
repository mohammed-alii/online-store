import { RouterLink } from '@angular/router';
import { FakeApiService } from './../services/fake-api.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  categories: string[];
  constructor(private fakeApiService: FakeApiService) {
    this.categories = [];
  }
  ngOnInit(): void {
    this.getCategories()
  }
  getCategories() {
    this.fakeApiService.getAllCategories().subscribe((res: string[]) => {
      this.categories = res;
    });
  }
}
