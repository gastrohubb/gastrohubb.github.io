import {Component} from '@angular/core';
import {Issue} from "../../dto/Issue";
import {GhbServiceClientService} from "../../service/ghb-service-client.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ContextService} from "../../service/context.service";
import {SessionUtilService} from "../../service/session-util.service";
import {GhbUser} from "../../dto/GhbUser";
import {MasterApplyIssueEvent} from "../../dto/MasterApplyIssueEvent";

//todo: could be divided on IssueCardMasterView and IssueCardCustomerView
@Component({
    selector: 'app-issue-extended-page',
    templateUrl: './issue-extended-page.component.html',
    styleUrls: ['./issue-extended-page.component.css']
})
export class IssueExtendedPageComponent {

    issue: Issue = new Issue();
    tries: number = 0; //todo: it not loading full data from first attempt. should be fixed.
    appContext: string;
    title: string = "Issue Details"
    masterApplyIssueEvent: MasterApplyIssueEvent[] = [];
    applyTimestamp: any;
    masterApplyIssueEventIfMasterSession: MasterApplyIssueEvent = new MasterApplyIssueEvent(null);

    constructor(private ghbClient: GhbServiceClientService,
                private router: ActivatedRoute,
                private navigate: Router,
                private context: ContextService,
                private session: SessionUtilService) {
        this.appContext = this.context.getAppContextPath();
    }

    ngOnInit() {
        let id = this.router.snapshot.paramMap.get('id');
        if (id != null) {
            this.ghbClient.findIssueByIdFull(id)
                .subscribe(issue => {
                    this.issue = issue;

                    this.getMastersAppliedOnIssue(issue.issueId);
                    if (!this.issue.photo && this.tries++ < 5) {
                        console.log("fail to load image, tries left " + (5 - this.tries));
                        setTimeout(() => {
                            console.log('sleep');
                            this.ngOnInit();
                            // And any other code that should run only after 5s
                        }, 1000);
                    }
                });
            this.setApplyDateIfMaserApplied(id)
        }


    }

    private getMastersAppliedOnIssue(issueId: string) {
        this.ghbClient.getAllMastersThatAppliedOnIssue(issueId).subscribe({
            next: (response: MasterApplyIssueEvent[]) => {
                response.forEach((event) => this.masterApplyIssueEvent.push(event));
            },
            error: (error: any) => {
                console.error(error);
            }
        });
    }

    onApplyClicked(event: Event) {
        event.preventDefault();
        let user: GhbUser = this.session.getUser();
        let userId = user.userId;
        let issueId = this.issue.issueId;
        this.ghbClient.saveMasterApplyIssueEvent(userId, issueId).subscribe({
            next: (response: MasterApplyIssueEvent) => {
                this.applyTimestamp = response.applyTimestamp;
                this.masterApplyIssueEventIfMasterSession = new MasterApplyIssueEvent(response);
            },
            error: (error: any) => {
                console.error(error);
            }
        });
    }

    private setApplyDateIfMaserApplied(issueId: string) {
        let user: GhbUser = this.session.getUser();
        let userId = user.userId;
        this.ghbClient.getMasterApplyIssueEvent(userId, issueId).subscribe({
            next: (response: MasterApplyIssueEvent) => {
                this.applyTimestamp = response.applyTimestamp;
                this.masterApplyIssueEventIfMasterSession = new MasterApplyIssueEvent(response);
            },
            error: (error: any) => {
                console.error(error);
            }
        });
    }
}
