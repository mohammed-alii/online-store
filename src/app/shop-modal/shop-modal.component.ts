import { ModalService } from './../services/modal.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoginComponent } from "../account/login/login.component";

@Component({
  selector: 'app-shop-modal',
  standalone: true,
  imports: [CommonModule, LoginComponent],
  templateUrl: './shop-modal.component.html',
  styleUrl: './shop-modal.component.scss',
})
export class ShopModalComponent {
  modalActive: boolean;
  constructor(private modalService: ModalService) {
    this.modalActive = this.modalService.isActive;
  }
  ngAfterContentChecked(): void {
    this.modalActive = this.modalService.isActive;
  }
  openModal() {
    this.modalActive = true;
    this.modalActive = this.modalService.openModal()
  }
  dismissModal() {
    this.modalActive = false;
    this.modalService.dismissModal()
  }
  handleLoginEvent(event: boolean) {
    this.modalActive = event
    this.modalService.isActive = event
  }
}
