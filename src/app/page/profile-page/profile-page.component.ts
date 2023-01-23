import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {GhbUser} from "../../dto/GhbUser";
import {GhbServiceClientService} from "../../service/ghb-service-client.service";
import {SessionUtilService} from "../../service/session-util.service";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent {
  profileImage: any = "./assets/tempimg/user1.jpg";
  name: any = "First and Last Name";
  details: any = "Short description for specialization";

  user: GhbUser = new GhbUser();

  constructor(private router: Router,
              private ghbService: GhbServiceClientService,
              private sessionService: SessionUtilService) { }

  ngOnInit(): void {
    let user: GhbUser = this.sessionService.getUser();
    if(!user.isEmpty()) {
      this.user = user;
    }
  }

  logout() {
    sessionStorage.removeItem("user");
  }
}
