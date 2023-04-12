import {Component, HostListener} from '@angular/core';
import {Issue} from "../../dto/Issue";
import {Master} from "../../dto/Master";
import {GhbServiceClientService} from "../../service/ghb-service-client.service";
import {Router} from "@angular/router";
import {ConfigService} from "../../service/config.service";
import {ContextService} from "../../service/context.service";
import {SessionUtilService} from "../../service/session-util.service";
import {MasterApplyIssueEvent} from "../../dto/MasterApplyIssueEvent";

@Component({
  selector: 'app-favorites-customer-page',
  templateUrl: './favorites-customer-page.component.html',
  styleUrls: ['./favorites-customer-page.component.css']
})
export class FavoritesCustomerPageComponent {
  txtMySelectedMasters: string = $localize `My selected Masters`;
  issues: Issue[] = [];
  masters: Master[] = [];
  masterApplyIssueEvents: MasterApplyIssueEvent[] = [];
  scrollThreshold: number = 1000;
  currentPage: number = 0;
  totalPages: number = 0;
  config: any;
  appContext: string;

  constructor(private ghbClient: GhbServiceClientService,
              private router: Router,
              private context: ContextService,
              private session: SessionUtilService) {
    this.appContext = context.getAppContextPath();
  }

  ngOnInit() {

    this.ghbClient.getForCustomerAllIssuesWhereMasterApproved(this.session.getUser().userId).subscribe({
      next: (response: MasterApplyIssueEvent[]) => {
        response.forEach((event) => {
          this.masterApplyIssueEvents.push(event);
          this.masters.push(event.master);
        });
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }
}
