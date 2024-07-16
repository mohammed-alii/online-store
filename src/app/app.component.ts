import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgClass,NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'ecommerce-webapp';
  constructor() {}
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
