import { Component } from '@angular/core';
import {Issue} from "../../dto/issue";

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css']
})
export class IssueListComponent {
  issues: Issue[];


  constructor() {
    let issue1 = new Issue();
    issue1.description = "description 1";
    issue1.customer = "customer 1";

    let issue2 = new Issue();
    issue2.description = "description 2";
    issue2.customer = "customer 2";

    let issue3 = new Issue();
    issue3.description = "description 3";
    issue3.customer = "customer 3";

    let issue4 = new Issue();
    issue4.description = "description 4";
    issue4.customer = "customer 4";

    let issue5 = new Issue();
    issue5.description = "description 5";
    issue5.customer = "customer 5";

    this.issues = [issue1, issue2, issue3, issue4, issue5];
  }

}
