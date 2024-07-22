import { ModalService } from './../services/modal.service';
import { FakeApiService } from './../services/fake-api.service';
import { NgClass } from '@angular/common';
import { ThemeService } from './../services/theme.service';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [NgClass, RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent implements OnInit {
  isDark: boolean;
  navCollapse: boolean;
  dropDownCollapse: boolean;
  categories: string[];
  cartCount: number;
  closeResult = '';
  isLogged: any;
  userId: any;
  constructor(
    private themeService: ThemeService,
    private fakeApiService: FakeApiService,
    private modalService: ModalService
  ) {
    this.isDark = JSON.parse(
      window.localStorage.getItem('darkMode') ?? 'false'
    );
    this.isLogged = window.localStorage.getItem('isAuth')
    this.userId = window.localStorage.getItem('userMail')
    console.log(this.isLogged)
    this.navCollapse = false;
    this.dropDownCollapse = false;
    this.categories = [];
    this.cartCount = 0;
  }
  ngAfterContentChecked(): void {
    //Called after every check of the component's or directive's content.
    //Add 'implements AfterContentChecked' to the class.
    this.getCartCount();
    if (this.isLogged === null) {
      this.isLogged = window.localStorage.getItem('isAuth')
      this.userId = window.localStorage.getItem('userMail')
    }
  }
  ngOnInit(): void {
    this.getCategories();
    this.getCartCount();
  }
  getCategories() {
    this.fakeApiService.getAllCategories().subscribe((res: string[]) => {
      this.categories = res;
    });
  }
  toggleTheme() {
    this.themeService.toggleDarkMode();
    console.log('service triggered');
    this.isDark = JSON.parse(
      window.localStorage.getItem('darkMode') ?? 'false'
    );
  }
  toggleNav() {
    this.navCollapse = this.navCollapse ? false : true;
    console.log(this.navCollapse);
  }
  toggleDropDown() {
    this.dropDownCollapse = this.dropDownCollapse ? false : true;
    console.log(this.dropDownCollapse);
  }
  getCartCount() {
    this.cartCount = 0
    let cart: any = window.localStorage.getItem('cartItems');
    cart = JSON.parse(cart);
    if (cart) {
      cart.forEach((element: any) => {
        this.cartCount += element.quantity;
      });
    }
  }
  openModal() {
    this.modalService.openModal()
    console.log(this.modalService.isActive)
  }
  SignOut() {
    window.localStorage.removeItem('isAuth')
    window.localStorage.removeItem('userMail')
    this.isLogged = null
  }
}
