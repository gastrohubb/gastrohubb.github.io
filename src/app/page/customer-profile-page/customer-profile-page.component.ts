import { Component } from '@angular/core';
import {Master} from "../../dto/Master";
import {Customer} from "../../dto/Customer";
import {GhbUser} from "../../dto/GhbUser";
import {Router} from "@angular/router";
import {GhbServiceClientService} from "../../service/ghb-service-client.service";
import {SessionUtilService} from "../../service/session-util.service";
import {ContextService} from "../../service/context.service";

@Component({
  selector: 'app-customer-profile-page',
  templateUrl: './customer-profile-page.component.html',
  styleUrls: ['./customer-profile-page.component.css']
})
export class CustomerProfilePageComponent {
  profileImage: any = "./assets/tempimg/user1.jpg";
  name: any = "First and Last Name";
  details: any = "Short description for specialization";

  master: Master = new Master();
  customer: Customer = new Customer(null);
  user: GhbUser = new GhbUser();
  appContext: string;
  myInfoRestaurant: string = $localize `My info - Restaurant`;
  clickToAddOrEdit: string = $localize `Click to add or edit`;

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

    this.ghbService.findCustomerByGhbUserId(user.userId)
        .pipe()
        .subscribe(c => this.customer = c);
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

