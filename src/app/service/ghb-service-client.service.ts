import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GhbUser} from "../dto/GhbUser";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GhbServiceClientService {
  private uri: string = "http://localhost:8080";

  constructor(private http: HttpClient) {
  }

  public saveNewUser(user: GhbUser) {
    return this.http.post(this.uri + "/ghbUsers", user).subscribe();
  }

  public findUserByEmail(email: string): Observable<GhbUser> {
    return this.http.get<GhbUser>(this.uri + "/ghbUsers/search/findByEmail?email=" + email);
  }
}
