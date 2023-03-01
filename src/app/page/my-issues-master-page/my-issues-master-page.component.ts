import {Component} from '@angular/core';
import {Issue} from "../../dto/Issue";
import {GhbServiceClientService} from "../../service/ghb-service-client.service";
import {SessionUtilService} from "../../service/session-util.service";
import {Router} from "@angular/router";
import {MasterApplyIssueEvent} from "../../dto/MasterApplyIssueEvent";
import {ContextService} from "../../service/context.service";

@Component({
    selector: 'app-my-issues-master-page',
    templateUrl: './my-issues-master-page.component.html',
    styleUrls: ['./my-issues-master-page.component.css']
})
export class MyIssuesMasterPageComponent {
    title: string = "Issues applied";
    issues: Issue[] = [];
    masterApplyIssueEvent: MasterApplyIssueEvent[] = [];
    contextPath: string = "";
    scrollThreshold: number = 1000;
    currentPage: number = 0;
    totalPages: number = 0;

    constructor(private ghbClient: GhbServiceClientService,
                private sessionService: SessionUtilService,
                private router: Router,
                private context: ContextService) {
        this.contextPath = context.getAppContextPath();
    }

    ngOnInit() {
        let userId: string = this.sessionService.getUser().userId;
        this.ghbClient.getIssuesMasterAppliedOn(userId).subscribe({
            next: (response: MasterApplyIssueEvent[]) => {
                response.forEach((event) => this.masterApplyIssueEvent.push(event));
            },
            error: (error: any) => {
                console.error(error);
            }
        });
    }

    // todo: enable pagination on server side and add request on scrolling
    // @HostListener('window:scroll', ['$event'])
    onWindowScroll(event: any) {
        console.log(window.scrollY + this.scrollThreshold)
        if (this.isScrolledToTheBottom() && this.hasNextPage()) {
            this.scrollThreshold = this.scrollThreshold / 10;
            this.ghbClient.getPageOfIssuesForByUserId(this.currentPage++, this.sessionService.getUser().userId)
                .pipe()
                .subscribe(page => {
                    let embedded = page._embedded;
                    let issuesList: Issue[] = embedded.issues as Issue[];
                    issuesList.forEach((item) => this.issues.push(item));
                    this.scrollThreshold = this.scrollThreshold * 10;
                });
        }
    }

    private isScrolledToTheBottom(): boolean {
        return window.scrollY + this.scrollThreshold > document.body.scrollHeight;
    }

    private hasNextPage(): boolean {
        return this.currentPage < this.totalPages;
    }

    navigate() {
        this.router.navigate(['master/home']);
    }
}
