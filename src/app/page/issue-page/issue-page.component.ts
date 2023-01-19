import {Component} from '@angular/core';
import {Issue} from "../../dto/issue";

@Component({
  selector: 'app-issue-page',
  templateUrl: './issue-page.component.html',
  styleUrls: ['./issue-page.component.css']
})
export class IssuePageComponent {
  issue: Issue;

  constructor() {
    this.issue = new Issue();
    this.issue.issueId = null;
    this.issue.description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.";
    this.issue.photo = "./assets/tempimg/trending1.png";
    this.issue.city = "Gdansk";
    this.issue.issueStatus = "New";
    this.issue.timestamp = "2023-02-01";
    this.issue.customer = "Pizza Caprichoza";
  }
}
