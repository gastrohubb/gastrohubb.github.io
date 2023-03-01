import { Component } from '@angular/core';
import {Issue} from "../../dto/Issue";

@Component({
  selector: 'app-favorits-page',
  templateUrl: './favorits-page.component.html',
  styleUrls: ['./favorits-page.component.css']
})

// Favorits icon: master - issues in progress|done, restaurant - masters I worked with
export class FavoritsPageComponent {
  title: string = "Approved and Done (master) <br /> Masters I work with (restaurant)";
  issues: Issue[] = [];
}
