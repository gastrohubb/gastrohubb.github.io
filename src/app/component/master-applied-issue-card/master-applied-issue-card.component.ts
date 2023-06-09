import {Component, Input} from '@angular/core';
import {Issue} from "../../dto/Issue";
import {MasterApplyIssueEvent} from "../../dto/MasterApplyIssueEvent";
import {ConfigService} from "../../service/config.service";

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


  constructor(private configService: ConfigService) {
  }

  public hasImages() {
    return this.masterApplyIssueEvent.issue.imageUuidContainer != undefined
        && this.masterApplyIssueEvent.issue.imageUuidContainer != null
        && this.masterApplyIssueEvent.issue.imageUuidContainer.length > 0;
  }

  getImgById(uuid: string) {
    return this.configService.filesEndpoint() + "/" + uuid;
  }
}
