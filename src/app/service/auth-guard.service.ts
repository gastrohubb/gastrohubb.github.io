import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {GhbUser} from "../dto/GhbUser";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivateOrRedirectToLogin();
  }

  canActivateOrRedirectToLogin(): boolean {
    if (this.canActivateOrNot()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

  canActivateOrNot(): boolean {
    let userJson = sessionStorage.getItem("user");
    if (userJson != null) {
      let user: GhbUser = JSON.parse(userJson) as GhbUser;
      if (user.sessionToken != null && user.sessionToken.length == 36) {
        return true;
      }
    }
    return false;
  }
}
