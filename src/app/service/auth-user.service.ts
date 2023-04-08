import {Injectable} from '@angular/core';
import {GhbUser} from "../dto/GhbUser";
import {KeycloakService} from "keycloak-angular";
import {GhbServiceClientService} from "./ghb-service-client.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {KeycloakUser} from "../dto/KeycloakUser";
import {catchError, throwError} from "rxjs";
import {SessionUtilService} from "./session-util.service";

@Injectable({
    providedIn: 'root'
})
export class AuthUserService {

    constructor(private keycloak: KeycloakService,
                private ghbClient: GhbServiceClientService,
                private http: HttpClient,
                private sessionService: SessionUtilService) {
    }

    public getUser(): GhbUser {
        this.keycloak.loadUserProfile()
            .then(userProfile => {
                let keycloakUser: KeycloakUser = new KeycloakUser();
                keycloakUser.setUserName(userProfile.username);
                keycloakUser.setEmail(userProfile.email);
                keycloakUser.setUserId(userProfile.id);
                console.log(keycloakUser);
                this.ghbClient.registerKeycloakUser(keycloakUser)
                    .pipe(
                        catchError(error => {
                            console.log(error)
                            return throwError(() => new Error(error));
                        }))
                    .subscribe(u => {
                            this.sessionService.putUser(u);
                            console.log("user is in session: " + this.sessionService.getUser());
                        }
                    )
            })
            .catch(error => console.log(error));
        return this.sessionService.getUser();
    }

    public getUserByKeycloakId(): Promise<GhbUser> {
        try {
            let id = "b560541a-758d-4bd7-8690-812e0a4c5266";
            let user: Promise<GhbUser> = this.ghbClient.findUserByKeycloakId(id);
            console.log("user is " + user);
            return user;
        } catch (error) {
            if (error instanceof HttpErrorResponse && error.status === 404) {
                let user = new GhbUser();
                user.userName = "handled";
                return Promise.resolve(user);
            }
            return Promise.resolve(new GhbUser());
        }
    }

}
