import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {GhbUser} from "../dto/GhbUser";
import {catchError, Observable} from "rxjs";
import {NewUser} from "../dto/NewUser";
import {Master} from "../dto/Master";
import {SessionUtilService} from "./session-util.service";
import {Customer} from "../dto/Customer";

@Injectable({
  providedIn: 'root'
})
export class GhbServiceClientService {
  private uri: string = "http://localhost:8080";

  constructor(private http: HttpClient,
              private sessionService: SessionUtilService) {
  }

  public registerUser(user: NewUser): Observable<GhbUser> {
    return this.http.post<GhbUser>(this.uri + "/register", user);
  }

  public getUserById(userId: string): Observable<GhbUser> { //todo: add session token
    return this.http.get<GhbUser>(this.uri + "/ghbUsers/" + userId);
  }

  public findUserByEmail(email: string): Observable<GhbUser> {
    return this.http.get<GhbUser>(this.uri + "/ghbUsers/search/findByEmail?email=" + email);
  }

  public findUserByEmailAndPassword(email: string, password: string): Observable<GhbUser> {
    return this.http.get<GhbUser>(this.uri + "/login?email=" + email + "&password=" + password);
  }

  public updateUser(user: GhbUser): Observable<GhbUser> {
    return this.http.patch<GhbUser>(this.uri + "/ghbUsers/" + user.userId, user);
  }

  public saveNewMaster(master: Master) {
    this.http.post<any>(this.uri + "/masters/", master)
      .pipe() //todo: handle exception
      .subscribe(m => {
        let masterToUserEndpoint: string = m._links.ghbUser.href;
        let user: GhbUser = this.sessionService.getUser();
        let userLink = user._links.self.href;
        let headers = new HttpHeaders();
        headers = headers.set('content-type', 'text/uri-list');
        console.log(masterToUserEndpoint);
        this.http.put(masterToUserEndpoint, userLink, {headers})
          .pipe(
            catchError(error => {
              console.log("post assotiated link Error:", error);
              return new Observable<never>();
            }))
          .subscribe(result => {
            alert(result);
          });
      })
  }

  public saveNewCustomer(customer: Customer) {
    this.http.post<any>(this.uri + "/customers/", customer)
      .pipe() //todo: handle exception
      .subscribe(c => {
        let costomerToUserEndpoint: string = c._links.ghbUser.href;
        let user: GhbUser = this.sessionService.getUser();
        let userLink = user._links.self.href;
        let headers = new HttpHeaders();
        headers = headers.set('content-type', 'text/uri-list');
        console.log(costomerToUserEndpoint);
        this.http.put(costomerToUserEndpoint, userLink, {headers})
          .pipe(
            catchError(error => {
              console.log("post assotiated link Error:", error);
              return new Observable<never>();
            }))
          .subscribe(result => {
            alert(result);
          });
      })
  }
}
