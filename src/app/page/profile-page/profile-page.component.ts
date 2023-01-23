import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent {
  profileImage: any = "./assets/tempimg/user1.jpg";
  name: any = "First and Last Name";
  details: any = "Short description for specialization";


  constructor(private router: Router) { }

  logout() {
    sessionStorage.removeItem("user");
  }
}
