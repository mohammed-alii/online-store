import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  toggleDarkMode() {
    if (!document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.add('dark');
      window.localStorage.setItem('darkMode', 'true')
    } else {
      document.documentElement.classList.remove('dark');
      window.localStorage.setItem('darkMode', 'false')
    }
  }
}
