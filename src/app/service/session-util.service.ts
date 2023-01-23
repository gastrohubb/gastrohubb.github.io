import {Injectable} from '@angular/core';
import {GhbUser} from "../dto/GhbUser";

@Injectable({
  providedIn: 'root'
})
export class SessionUtilService {

  constructor() { }

  public getUser(): GhbUser {
    let userJson = sessionStorage.getItem("user");
    if (userJson != null) {
      let user: GhbUser = GhbUser.fromJson(JSON.parse(userJson));
      return user;
    }
    return new GhbUser();
  }

  public putUser(user: GhbUser) {
    sessionStorage.setItem("user", JSON.stringify(user));
  }
}
