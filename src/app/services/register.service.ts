import { Injectable } from '@angular/core';
import { user } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  finalData: any[];
  parsedData: any[];
  duplicateMail: boolean;
  constructor() {
    this.finalData = [];
    this.parsedData = [];
    this.duplicateMail = false;
  }
  pushUser(user: any) {
    let existingUsers = window.localStorage.getItem('users');

    if (existingUsers) {
      this.parsedData = JSON.parse(existingUsers);

      if (typeof this.parsedData === typeof []) {
        for (let i = 0; i < this.parsedData.length; i++) {
          this.finalData.push(this.parsedData[i]);
        }
      } else this.finalData.push(this.parsedData);
      this.finalData.push(user);
      console.log(this.uniqueUserChecker(this.parsedData, user));
      if (this.uniqueUserChecker(this.parsedData, user)) {
        window.localStorage.setItem('users', JSON.stringify(this.finalData));
        this.duplicateMail = false;
      } else this.duplicateMail = true;
      this.finalData = [];
    } else {
      this.finalData.push(user);
      if (this.uniqueUserChecker(this.parsedData, user)) {
        window.localStorage.setItem('users', JSON.stringify(this.finalData));
        this.duplicateMail = false;
      } else this.duplicateMail = true;
      this.finalData = [];
    }
  }
  uniqueUserChecker(users: any[], user: user) {
    return !users.some((existingUser) => existingUser.email === user.email);
  }
}
