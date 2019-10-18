import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';
import {ModalControllerService} from '../../providers/modal-controller.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage {
  login: UserOptions = { username: '', password: '' };
  submitted = false;

  constructor(
    public userData: UserData,
    public router: Router,
    public modalControllerService: ModalControllerService
  ) { }

  onLogin(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      this.userData.login(this.login.username).then(response => {
        if (response) {
          this.userData.isLoggedIn().then(
            loggedIn => {
              if (loggedIn) {
                this.modalControllerService.refresh();
                this.router.navigateByUrl('/app/tabs/dashboard');
              }
            }
          );
        }
      });
    }
  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }
}
