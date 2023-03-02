import { Component } from '@angular/core';
import {Master} from "../../dto/Master";
import {Customer} from "../../dto/Customer";
import {GhbUser} from "../../dto/GhbUser";
import {Router} from "@angular/router";
import {GhbServiceClientService} from "../../service/ghb-service-client.service";
import {SessionUtilService} from "../../service/session-util.service";
import {ContextService} from "../../service/context.service";

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
  customer: Customer = new Customer();
  user: GhbUser = new GhbUser();
  appContext: string;

  constructor(private router: Router,
              private ghbService: GhbServiceClientService,
              private sessionService: SessionUtilService,
              private context: ContextService) {
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
  }

  logout() {
    sessionStorage.removeItem("user");
  }


  async formUpdatedInChild() {
    await this.sleep(500);
    this.ngOnInit();
  }

  sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
