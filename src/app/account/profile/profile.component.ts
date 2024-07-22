import { Component } from '@angular/core';
import { user } from '../../models/user';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  user: any;
  users: any
  userId: string | null
  constructor () {
    this.user = {} as user
    this.userId = window.localStorage.getItem('userMail')
  }
  ngOnInit(): void {
    this.getUsers()
    console.log(this.user)
  }
  getUsers() {
    let users = window.localStorage.getItem('users');
    if (users) {
       users = JSON.parse(users)
       this.users = users
       this.getUser()
    }
  }
  getUser() {
    this.users.filter((user: user) => {
      if (this.userId === user.email) {
        this.user = user
      }
    })
  }
}
