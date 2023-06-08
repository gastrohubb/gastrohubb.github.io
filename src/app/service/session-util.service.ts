import {Injectable} from '@angular/core';
import {GhbUser} from "../dto/GhbUser";
import {KeycloakService} from "keycloak-angular";
import {KeycloakUser} from "../dto/KeycloakUser";
import {catchError, throwError} from "rxjs";
import {ConfigService} from "./config.service";
import {HttpClient} from "@angular/common/http";
import {KeycloakProfile} from "keycloak-js";

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
            console.log('User is in session, returning');
            let user: GhbUser = GhbUser.fromJson(JSON.parse(userJson));
            return user;
        }
        console.log('User is not in session, verify or create new');
        this.getOrCreateUserAndSetUserToSession().then(user => {
            this.putUser(user);
        });
        // todo: we need to wait when user will be in session instead of returning new GhbUser.
        return new GhbUser();
    }

    public async getOrCreateUserAndSetUserToSession(): Promise<GhbUser> {
        console.log('Taking userProfile from Keycloak');
        const keycloakProfile: KeycloakProfile = await this.getUserKeycloakProfile();
        console.log('Map it to keyckloakUser instance');
        const keycloakUser: KeycloakUser = this.makeKeycloakUser(keycloakProfile);
        console.log('Sending instance to server to verify it exist or create new');
        const ghbUser: GhbUser = this.getOrCreateUser(keycloakUser);
        console.log('Putting ghbUser instance to session');
        this.setUserToSession(ghbUser);
        return ghbUser;
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

    public async getUserKeycloakProfile(): Promise<KeycloakProfile> {
        try {
            const profile = await this.keycloak.loadUserProfile();
            return profile;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    public makeKeycloakUser(keycloakProfile: KeycloakProfile) {
        let keycloakUser: KeycloakUser = new KeycloakUser();
        keycloakUser.setUserName(keycloakProfile.username);
        keycloakUser.setEmail(keycloakProfile.email);
        keycloakUser.setUserId(keycloakProfile.id);
        return keycloakUser;
    }

    public getOrCreateUser(keycloakUser: KeycloakUser): GhbUser {
        const url = this.config.apiUrl() + "/getOrCreateUser";
        const data = JSON.stringify(keycloakUser);

        const httpRequest = new XMLHttpRequest();
        httpRequest.open("POST", url, false);
        httpRequest.setRequestHeader("Content-Type", "application/json");
        try {
            httpRequest.send(data);
            if (httpRequest.status === 200) {
                const response: GhbUser = JSON.parse(httpRequest.responseText);
                return response;
            } else {
                // Handle non-200 status code
                console.error(`POST request failed with status: ${httpRequest.status}`);
            }
        } catch (error) {
            // Handle error
            console.error(error);
        }
        return new GhbUser();
        // todo: consider pattern emptyObject|null|undefined
    }
    public setUserToSession(user: GhbUser) {
        this.putUser(user);
    }

    async isLoggedIn(): Promise<boolean> {
        const isLoggedIn = await this.keycloak.isLoggedIn();
        return isLoggedIn;
    }
}
