import { Component } from '@angular/core';
import {Issue} from "../../dto/Issue";
import {ContextService} from "../../service/context.service";
import {SessionUtilService} from "../../service/session-util.service";
import {MasterApplyIssueEvent} from "../../dto/MasterApplyIssueEvent";
import {GhbServiceClientService} from "../../service/ghb-service-client.service";

@Component({
  selector: 'app-favorites-master-page',
  templateUrl: './favorites-master-page.component.html',
  styleUrls: ['./favorites-master-page.component.css']
})
export class FavoritesMasterPageComponent {
  title: string = "Approved and Done issues";
  issues: Issue[] = [];
  masterApplyIssueEvent: MasterApplyIssueEvent[] = [];
  contextPath: string;


  constructor(private context: ContextService,
              private session: SessionUtilService,
              private ghbClient: GhbServiceClientService) {
    this.contextPath = this.context.getAppContextPath();
  }

  ngOnInit() {
    let userId: string = this.session.getUser().userId;
    this.ghbClient.getIssuesWhereMasterApproved(userId).subscribe({
      next: (response: MasterApplyIssueEvent[]) => {
        response.forEach((event) => this.masterApplyIssueEvent.push(event));
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }
}
