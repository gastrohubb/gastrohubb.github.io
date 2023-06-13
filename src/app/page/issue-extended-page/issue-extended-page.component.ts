import {Component} from '@angular/core';
import {Issue} from "../../dto/Issue";
import {GhbServiceClientService} from "../../service/ghb-service-client.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ContextService} from "../../service/context.service";
import {SessionUtilService} from "../../service/session-util.service";
import {GhbUser} from "../../dto/GhbUser";
import {MasterApplyIssueEvent} from "../../dto/MasterApplyIssueEvent";
import {ConfigService} from "../../service/config.service";

//todo: could be divided on IssueCardMasterView and IssueCardCustomerView
@Component({
    selector: 'app-issue-extended-page',
    templateUrl: './issue-extended-page.component.html',
    styleUrls: ['./issue-extended-page.component.css']
})
export class IssueExtendedPageComponent {

    issue: Issue = new Issue(null);
    tries: number = 0; //todo: it not loading full data from first attempt. should be fixed.
    appContext: string;
    txtIssueDetails: string = $localize`Issue Details`;
    masterApplyIssueEvent: MasterApplyIssueEvent[] = [];
    applyTimestamp: any;
    masterApplyIssueEventIfMasterSession: MasterApplyIssueEvent = new MasterApplyIssueEvent(null);

    constructor(private ghbClient: GhbServiceClientService,
                private router: ActivatedRoute,
                private navigate: Router,
                private context: ContextService,
                private configService: ConfigService,
                private session: SessionUtilService) {
        this.appContext = this.context.getAppContextPath();
    }

    ngOnInit() {
        let id = this.router.snapshot.paramMap.get('id');
        if (id != null) {
            this.ghbClient.findIssueByIdFull(id)
                .subscribe(issue => {
                    this.issue = new Issue(issue);
                    this.getMastersAppliedOnIssue(issue.issueId);
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
        this.session.checkIfMasterFillInfo().then(test => {
            if (!test) {
                let path: string = this.context.getAppContextPath();
                this.navigate.navigate([path + '/profile'])
            } else {

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

    public hasImages() {
        return this.issue.imageUuidContainer != undefined
            && this.issue.imageUuidContainer != null
            && this.issue.imageUuidContainer.length > 0;
    }

    getImgById(uuid: string) {
        return this.configService.filesEndpoint() + "/" + uuid;
    }

    // carousel
    slides = [
        { img: 'http://localhost:8080/files/e3fc4bcf-682a-4428-9a2e-1c1ff9e5c8a5' },
        { img: 'http://localhost:8080/files/b3a7e97e-4886-4ec3-ab37-ae577c3f841c' },
        { img: 'http://localhost:8080/files/c5519d09-f041-4f26-a755-3a6127f0fe01' },
        { img: 'http://localhost:8080/files/e3fc4bcf-682a-4428-9a2e-1c1ff9e5c8a5' },
        { img: 'https://via.placeholder.com/600.png/654/fff' },
    ];
    slideConfig = { slidesToShow: 1, slidesToScroll: 1 };

    slickInit(e: any) {

        console.log('slick initialized');
    }
    breakpoint(e: any) {
        console.log('breakpoint');
    }
    afterChange(e: any) {
        console.log('afterChange');
    }
    beforeChange(e: any) {
        console.log('total photos = '+ this.issue.imageUuidContainer.length)
        console.log('beforeChange');
    }
}
