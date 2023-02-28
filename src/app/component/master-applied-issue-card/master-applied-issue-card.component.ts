import {Component, Input} from '@angular/core';
import {Issue} from "../../dto/Issue";
import {MasterApplyIssueEvent} from "../../dto/MasterApplyIssueEvent";

@Component({
  selector: 'app-master-applied-issue-card',
  templateUrl: './master-applied-issue-card.component.html',
  styleUrls: ['./master-applied-issue-card.component.css']
})
export class MasterAppliedIssueCardComponent {
  @Input()
  masterApplyIssueEvent: MasterApplyIssueEvent = new MasterApplyIssueEvent(null);
  @Input()
  contextPath: string = "";
}
