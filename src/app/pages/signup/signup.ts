import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';



@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  styleUrls: ['./signup.scss'],
})
export class SignupPage {
  signup: UserOptions = { username: '', password: '' , firstName: '', lastName: '', address: ''};
  submitted = false;

  constructor(
    public router: Router,
    public userData: UserData
  ) {}

  onSignup(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      this.userData.signup(this.signup).subscribe(res => {
        this.router.navigateByUrl('/app/tabs/dashboard');
      });
    }
  }
}
