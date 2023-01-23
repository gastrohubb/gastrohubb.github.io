import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GhbUser} from "../dto/GhbUser";
import {Observable} from "rxjs";
import {NewUser} from "../dto/NewUser";

@Injectable({
  providedIn: 'root'
})
export class GhbServiceClientService {
  private uri: string = "http://localhost:8080";

  constructor(private http: HttpClient) {
  }

  public registerUser(user: NewUser): Observable<GhbUser> {
    return this.http.post<GhbUser>(this.uri + "/register", user);
  }

  public findUserByEmail(email: string): Observable<GhbUser> {
    return this.http.get<GhbUser>(this.uri + "/ghbUsers/search/findByEmail?email=" + email);
  }

  public findUserByEmailAndPassword(email: string, password: string): Observable<GhbUser> {
    return this.http.get<GhbUser>(this.uri + "/login?email=" + email + "&password=" + password);
  }

  public updateUser(user: GhbUser): Observable<GhbUser> {
    return this.http.patch<GhbUser>(this.uri+ "/ghbUsers/"+user.userId, user);
  }
}
