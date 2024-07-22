import { RegisterService } from './../../services/register.service';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { customEmailValidator } from '../../validators/email.validator';
import { user } from '../../models/user';
import { passwordMatchValidator } from '../../validators/password-match.validator';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  days: number[];
  months: string[];
  years: number[];
  login: boolean;
  signUpSlideOne: boolean;
  signUpSlideTwo: boolean;
  loginForm: FormGroup;
  registerFrom: FormGroup;
  users: any;
  loginError: boolean;
  registerError: boolean;
  pwType: string;

  @Output() closeModal = new EventEmitter<boolean>()
  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService
  ) {
    this.loginForm = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.email, customEmailValidator],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.registerFrom = this.fb.group(
      {
        first_name: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(255),
          ],
        ],
        last_name: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(255),
          ],
        ],
        birth_date: ['', [Validators.required, Validators.minLength(6)]],
        email: [
          '',
          [Validators.required, Validators.minLength(6), customEmailValidator],
        ],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirm_password: ['', [Validators.required, Validators.minLength(6)]],
        day: ['', Validators.required],
        month: ['', Validators.required],
        year: ['', Validators.required],
      },
      { validators: passwordMatchValidator('password', 'confirm_password') }
    );
    this.days = [
      +'01',
      +'02',
      +'03',
      +'04',
      +'05',
      +'06',
      +'07',
      +'08',
      +'09',
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      28,
      29,
      30,
      31,
    ];
    this.months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    this.years = [];
    this.getYears();
    this.login = true;
    this.signUpSlideOne = false;
    this.signUpSlideTwo = false;
    this.loginError = false;
    this.registerError = false;
    this.pwType = 'password';
  }

  navToLogin() {
    this.login = true;
    this.signUpSlideOne = false;
    this.signUpSlideTwo = false;
  }
  navToSignUpOne() {
    this.login = false;
    this.signUpSlideOne = true;
    this.signUpSlideTwo = false;
  }
  navToSignUpTwo() {
    this.login = false;
    this.signUpSlideOne = false;
    this.signUpSlideTwo = true;
    this.getDateFromStrings();
  }
  getYears() {
    for (let i = 1924; i <= 2024; i++) {
      this.years.push(i);
    }
    this.years.sort((a, b) => {
      return a < b ? 1 : -1;
    });
  }
  getUsers(): any {
    this.users = window.localStorage.getItem('users');
    JSON.parse(this.users);
    return JSON.parse(this.users);
  }
  loginUser() {
    let users = this.getUsers();
    if (typeof users === typeof []) {
      users.filter((user: user) => {
        if (
          user.email == this.loginForm.controls['email'].value &&
          user.password == this.loginForm.controls['password'].value
        ) {
          window.localStorage.setItem('isAuth', 'true');
          window.localStorage.setItem('userMail', this.loginForm.controls['email'].value);
          this.closeModal.emit(false)
        }
      });
    }
    if (window.localStorage.getItem('isAuth') !== 'true') {
      this.loginError = true;
    } else this.loginError = false;
  }
  register() {
    this.registerService.pushUser(this.registerFrom.value);
    if (this.registerService.duplicateMail) {
      this.registerError = true;
    } else {
      this.navToLogin();
    }
  }
  changePasswordType(type: string) {
    this.pwType = type;
  }
  getDateFromStrings() {
    const monthIndex = new Date(
      Date.parse(this.registerFrom.controls['month'].value + ' 1, 2021')
    ).getMonth();
    const date = new Date(
      this.registerFrom.controls['year'].value,
      monthIndex,
      this.registerFrom.controls['day'].value
    );
    this.registerFrom.controls['birth_date'].patchValue(date);
  }
}
