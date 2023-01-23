import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {GhbServiceClientService} from "../../service/ghb-service-client.service";
import {GhbUser} from "../../dto/GhbUser";
import {catchError, Observable, throwError} from "rxjs";
import {NewUser} from "../../dto/NewUser";

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
  errorMessage: any;
  emailChecked: boolean = false;
  emailCheckPassed: boolean = false;

  constructor(private router: Router,
              private ghbClient: GhbServiceClientService) {
  }

  signUp() {

    if (this.emailChecked && this.emailCheckPassed) {
      let user = new NewUser();
      user.userName = this.name;
      user.password = this.password;
      user.email = this.email;

      if (this.password === this.repeatPassword
        && this.isNotEmpty(this.password)
        && this.isNotEmpty(this.name)
        && this.isNotEmpty(this.email)) {

        this.registerUserAndRedirect(user);

      } else if (this.password !== this.repeatPassword) {
        this.errorMessage = "Passwords don't match";
      } else if (this.emailChecked && !this.emailCheckPassed) {
        this.errorMessage = this.email + " is occupied. Chose another email.";
      } else if (!this.isNotEmpty(this.name)) {
        this.errorMessage = "Please, enter your name";
      } else if (!this.isNotEmpty(this.email)) {
        this.errorMessage = "Please, enter email"
      } else if (!this.isNotEmpty(this.password) || !this.isNotEmpty(this.repeatPassword)) {
        this.errorMessage = "Please, enter password"
      } else if (!this.emailChecked) {
        this.signUp();
      }
    }
  }

  private registerUserAndRedirect(user: NewUser) {
    this.ghbClient.registerUser(user)
      .pipe(
        catchError(error => {
          this.errorMessage = "Fail to register new user. Try again later";
          return throwError(() => new Error(error));
        }))
      .subscribe((user) => {
        sessionStorage.setItem("user", JSON.stringify(user));
        this.router.navigate(['/home'])
      })
  }

  redirectToLoginForm() {
    this.router.navigate(['/'])
  }

  checkEmail(event: FocusEvent) {
    const target = event.target as HTMLTextAreaElement;
    let email = target.value;
    this.ghbClient.findUserByEmail(email)
      .pipe(
        catchError(error => {
          if (error.status === 404) {
            this.emailChecked = true;
            this.emailCheckPassed = true;
            this.errorMessage = "";
            return new Observable<never>();
          } else {
            return throwError(() => new Error(error));
          }
        }))
      .subscribe(() => {
        this.emailChecked = true;
        this.emailCheckPassed = false;
        this.errorMessage = this.email + " is occupied. Chose another email.";
      })
  }

  private isNotEmpty(val: any): boolean {
    return val != null && val != undefined && val.length > 0;
  }
}
