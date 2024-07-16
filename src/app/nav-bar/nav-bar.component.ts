import { FakeApiService } from './../services/fake-api.service';
import { NgClass } from '@angular/common';
import { ThemeService } from './../services/theme.service';
import { Component, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [NgClass, RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit{
  isDark: boolean;
  navCollapse: boolean
  dropDownCollapse: boolean
  categories: string[];
  constructor (
    private themeService: ThemeService,
    private fakeApiService: FakeApiService
  ) {
    this.isDark = JSON.parse(window.localStorage.getItem('darkMode') ?? 'false')
    this.navCollapse = false
    this.dropDownCollapse = false
    this.categories = []
  }
  ngOnInit(): void {
    this.getCategories()
  }
  getCategories() {
    this.fakeApiService.getAllCategories().subscribe((res: string[]) => {
      this.categories = res;
    })
  }
  toggleTheme() {
    this.themeService.toggleDarkMode();
    console.log('service triggered')
    this.isDark = JSON.parse(window.localStorage.getItem('darkMode') ?? 'false')
  }
  toggleNav() {
    this.navCollapse = this.navCollapse ? false : true
    console.log(this.navCollapse)
  }
  toggleDropDown() {
    this.dropDownCollapse = this.dropDownCollapse ? false : true
    console.log(this.dropDownCollapse)
  }
}
