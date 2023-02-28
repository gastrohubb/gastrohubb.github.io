import {Component} from '@angular/core';
import {Issue} from "../../dto/Issue";
import {GhbServiceClientService} from "../../service/ghb-service-client.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ContextService} from "../../service/context.service";
import {SessionUtilService} from "../../service/session-util.service";
import {GhbUser} from "../../dto/GhbUser";
import {MasterApplyIssueEvent} from "../../dto/MasterApplyIssueEvent";
import { DatePipe } from '@angular/common';


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
    appliedTimestamp: any;

    constructor(private ghbClient: GhbServiceClientService,
                private router: ActivatedRoute,
                private navigate: Router,
                private context: ContextService,
                private session: SessionUtilService,
                private datePipe: DatePipe) {
        this.appContext = this.context.getAppContextPath();
    }

    ngOnInit() {
        let id = this.router.snapshot.paramMap.get('id');
        if (id != null) {
            this.ghbClient.findIssueByIdFull(id)
                .subscribe(issue => {
                    this.issue = issue;
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

    onApplyClicked(event: Event) {
        event.preventDefault();
        let user: GhbUser = this.session.getUser();
        let userId = user.userId;
        let issueId = this.issue.issueId;
        this.ghbClient.saveMasterApplyIssueEvent(userId, issueId).subscribe({
            next: (response: MasterApplyIssueEvent) => {
                this.appliedTimestamp = response.timestamp;
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
                this.appliedTimestamp = response.timestamp;
            },
            error: (error: any) => {
                console.error(error);
            }
        });
    }
}
