import {Injectable} from '@angular/core';
import {GhbUser} from "../dto/GhbUser";
import {KeycloakService} from "keycloak-angular";
import {GhbServiceClientService} from "./ghb-service-client.service";
import {KeycloakUser} from "../dto/KeycloakUser";
import {catchError, throwError} from "rxjs";
import {ConfigService} from "./config.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class SessionUtilService {
    requestForUserDataIsInProgress: boolean = false;

    constructor(private keycloak: KeycloakService,
                private config: ConfigService,
                private http: HttpClient) {
    }

    public getUser(): GhbUser {
        let userJson = sessionStorage.getItem("user");
        if (userJson != null) {
            let user: GhbUser = GhbUser.fromJson(JSON.parse(userJson));
            return user;
        } else if (this.requestForUserDataIsInProgress) {
            return this.getUser();
        }
        this.requestForUserDataIsInProgress = true;
        this.getOrCreateUserAndPutInSession();
        return this.getUser();
    }

    public putUser(user: GhbUser) {
        sessionStorage.setItem("user", JSON.stringify(user));
    }

    async getUserId(): Promise<string> {
        const userProfile = await this.keycloak.loadUserProfile();
        if (userProfile.id == undefined) {
            return "";
        }
        return userProfile.id;
    }

    async isLoggedIn(): Promise<boolean> {
        const isLoggedIn = await this.keycloak.isLoggedIn();
        return isLoggedIn;
    }

    getOrCreateUserAndPutInSession(): void {
        this.keycloak.loadUserProfile()
            .then(userProfile => {
                let keycloakUser: KeycloakUser = new KeycloakUser();
                keycloakUser.setUserName(userProfile.username);
                keycloakUser.setEmail(userProfile.email);
                keycloakUser.setUserId(userProfile.id);
                console.log(keycloakUser);
                this.http.post<GhbUser>(this.config.apiUrl() + "/register", keycloakUser)
                    .pipe(
                        catchError(error => {
                            console.log(error)
                            return throwError(() => new Error(error));
                        }))
                    .subscribe(u => {
                            this.putUser(u);
                            this.requestForUserDataIsInProgress = false;
                        }
                    )
            })
            .catch(error => console.log(error));
    }
}
