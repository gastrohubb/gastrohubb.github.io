import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {GhbUser} from "../dto/GhbUser";
import {ContextService} from "./context.service";
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService extends KeycloakAuthGuard {

    constructor(protected override readonly router: Router,
                private context: ContextService,
                protected readonly keycloak: KeycloakService) {
        super(router, keycloak);
    }

    // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    //     let statePath = state.url.substring(1, state.url.indexOf("/", 1))
    //     return this.canActivateOrRedirectToLogin(statePath);
    // }

    // canActivateOrRedirectToLogin(statePath?: string): boolean {
    //     if (this.canActivateOrNot()) {
    //         return true;
    //     }
    //     let path = this.context.getAppContextPath().length > 1 ? this.context.getAppContextPath() : statePath;
    //     this.router.navigate([path + '/login']);
    //     return false;
    // }

    // canActivateOrNot(): boolean {
    //     let userJson = sessionStorage.getItem("user");
    //     if (userJson != null) {
    //         let user: GhbUser = JSON.parse(userJson) as GhbUser;
    //         if (user.sessionToken != null && user.sessionToken.length == 36) {
    //             return true;
    //         }
    //     }
    //     return false;
    // }

    async isAccessAllowed( route: ActivatedRouteSnapshot,
                           state: RouterStateSnapshot): Promise<boolean | UrlTree> {

        if (!this.authenticated) {
            await this.keycloak.login({
                redirectUri: window.location.origin + state.url,
            });
        }

        return this.authenticated;
    }
}
