import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  email: any;
  password: any;

  constructor(private router: Router) {
  }

  signIn() {
    alert("login " + this.email + " password " + this.password);
    this.router.navigate(['/profile'])
  }

  redirectToRegister() {
    this.router.navigate(['/register'])
  }
}
