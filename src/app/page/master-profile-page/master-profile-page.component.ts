import { Component } from '@angular/core';
import {Master} from "../../dto/Master";
import {Customer} from "../../dto/Customer";
import {GhbUser} from "../../dto/GhbUser";
import {Router} from "@angular/router";
import {GhbServiceClientService} from "../../service/ghb-service-client.service";
import {SessionUtilService} from "../../service/session-util.service";
import {ContextService} from "../../service/context.service";
import {AuthUserService} from "../../service/auth-user.service";
import {KeycloakService} from "keycloak-angular";
import {KeycloakUser} from "../../dto/KeycloakUser";
import {catchError, throwError} from "rxjs";

@Component({
  selector: 'app-master-profile-page',
  templateUrl: './master-profile-page.component.html',
  styleUrls: ['./master-profile-page.component.css']
})
export class MasterProfilePageComponent {
  profileImage: any = "./assets/tempimg/user1.jpg";
  name: any = "First and Last Name";
  details: any = "Short description for specialization";

  master: Master = new Master();
  customer: Customer = new Customer(null);
  user: GhbUser = new GhbUser();
  appContext: string;

  userId: string = "no Id yet";
  userrrr: GhbUser = new GhbUser();

  constructor(private router: Router,
              private ghbService: GhbServiceClientService,
              private sessionService: SessionUtilService,
              private context: ContextService,
              private authUserService: AuthUserService,
              private keycloak: KeycloakService) {
    this.appContext = context.getAppContextPath();
  }

  ngOnInit(): void {
    let user: GhbUser = this.sessionService.getUser();
    if(!user.isEmpty()) {
      this.user = user;
    }

    this.ghbService.findMasterByGhbUserId(user.userId)
        .pipe()
        .subscribe(m => this.master = m);

    this.sessionService.getUserId().then(id => this.userId = id);
    this.sessionService.getUser();

    this.registerUser();
  }

  logout() {
    // this.keycloak.logout();
  }

  registerUser() {
    this.keycloak.loadUserProfile()
        .then(userProfile => {
          let keycloakUser: KeycloakUser = new KeycloakUser();
          keycloakUser.setUserName(userProfile.username);
          keycloakUser.setEmail(userProfile.email);
          keycloakUser.setUserId(userProfile.id);
          console.log(keycloakUser);
          this.ghbService.registerKeycloakUser(keycloakUser)
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
  }


  async formUpdatedInChild() {
    await this.sleep(500);
    this.ngOnInit();
  }

  sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
