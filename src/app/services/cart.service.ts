import { Injectable } from '@angular/core';
import { cartObj } from '../models/cart-obj';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  finalData: cartObj[];
  constructor() {
    this.finalData = [];
  }

  cartUpdater(data: cartObj) {
    this.finalData = [];
    let existingData = window.localStorage.getItem('cartItems');

    if (existingData) {
      let parsedData = JSON.parse(existingData);

      if (typeof parsedData === typeof []) {
        for (let i = 0; i < parsedData.length; i++) {
          this.finalData.push(parsedData[i]);
        }
      } else this.finalData.push(parsedData);

      this.finalData.push(data);

      window.localStorage.setItem(
        'cartItems',
        JSON.stringify(this.mergeDuplicates(this.finalData))
      );
    } else {
      this.finalData.push(data);
      window.localStorage.setItem('cartItems', JSON.stringify([data]));
    }
  }
  reAssignCartData(data: any) {
    window.localStorage.setItem(
      'cartItems',
      JSON.stringify(this.mergeDuplicates(data))
    );
  }
  mergeDuplicates(dataArray: cartObj[]): cartObj[] {
    const uniqueItems: { [key: number]: cartObj } = {};
    dataArray.forEach((item) => {
      if (uniqueItems[item.id]) {
        uniqueItems[item.id].quantity += item.quantity;
      } else {
        uniqueItems[item.id] = { ...item };
      }
    });
    return Object.values(uniqueItems);
  }
}
