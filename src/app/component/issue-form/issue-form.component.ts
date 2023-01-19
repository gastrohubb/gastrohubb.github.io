import {Component, Input} from '@angular/core';
import {Issue} from "../../dto/Issue";

@Component({
  selector: 'app-issue-form',
  templateUrl: './issue-form.component.html',
  styleUrls: ['./issue-form.component.css']
})
export class IssueFormComponent {
  issue: Issue = new Issue();
  @Input()
  modalId: any;

  save() {
    window.alert(this.issue.description + " " + this.issue.city);
  }
}
