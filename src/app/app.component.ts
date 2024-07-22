import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NgClass } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { ShopModalComponent } from './shop-modal/shop-modal.component';
import { ModalService } from './services/modal.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgClass,NavBarComponent, FooterComponent, ShopModalComponent, ShopModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'ecommerce-webapp';
  constructor(public modalService: ModalService) {}
  ngOnInit(): void {
    this.themeInitiator()
  }
  themeInitiator() {
    if (window.localStorage.getItem('darkMode') === 'true') {
      document.documentElement.classList.add('dark');
      window.localStorage.setItem('darkMode', 'true')
    }
  }
}
