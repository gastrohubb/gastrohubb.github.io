import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  name: any;
  email: any;
  password: any;
  repeatPassword: any;

  constructor(private router: Router) {
  }

  signUp() {
    alert("name " + this.name + " password " + this.password + " repeatPassword " + this.repeatPassword + " email " + this.email);
    this.router.navigate(['/home'])
  }

  redirectToLoginForm() {
    this.router.navigate(['/'])
  }
}
