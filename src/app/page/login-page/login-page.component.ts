import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {GhbServiceClientService} from "../../service/ghb-service-client.service";
import {catchError, Observable, throwError} from "rxjs";
import {SessionUtilService} from "../../service/session-util.service";
import {ContextService} from "../../service/context.service";

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
    email: any;
    password: any;
    errorMessage: any;

    constructor(private router: Router,
                private ghbClient: GhbServiceClientService,
                private sessionService: SessionUtilService,
                private context: ContextService) {
    }

    signIn() {
        this.ghbClient.findUserByEmailAndPassword(this.email, this.password)
            .pipe(
                catchError(error => {
                    if (error.status === 404) {
                        this.errorMessage = "Email or password incorrect";
                        return new Observable<never>();
                    } else {
                        this.errorMessage = "Email or password incorrect";
                        //todo: currently instead of 404 server returns 0;
                        return throwError(() => new Error(error));
                    }
                }))
            .subscribe((user) => {
                this.ghbClient.getUserById(user.userId)
                    .pipe(
                        catchError(error => {
                            this.errorMessage = "Server error";
                            return throwError(() => new Error(error));
                        }))
                    .subscribe(u => {
                            this.sessionService.putUser(u);
                            let path: string = this.context.getAppContextPath();
                            this.router.navigate([path + '/home'])
                        }
                    )
            });
    }

    redirectToRegister() {
        let path: string = this.context.getAppContextPath();
        this.router.navigate([path + '/register'])
    }
}
