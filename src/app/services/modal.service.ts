import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  isActive: boolean;
  constructor() {
    this.isActive = false
  }
  openModal(): boolean {
    this.isActive = true
    return true
  }
  dismissModal(): boolean {
    this.isActive = false
    return false
  }
}
