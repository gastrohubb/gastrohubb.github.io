import {Component, HostListener} from '@angular/core';
import {Issue} from "../../dto/Issue";
import {GhbServiceClientService} from "../../service/ghb-service-client.service";
import {SessionUtilService} from "../../service/session-util.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-my-issues-page',
    templateUrl: './my-issues-page.component.html',
    styleUrls: ['./my-issues-page.component.css']
})
export class MyIssuesPageComponent {
    title: string = "Issues applied (master) <br /> My issues (restaurant)";
    issues: Issue[] = [];
    scrollThreshold: number = 1000;
    currentPage: number = 0;
    totalPages: number = 0;

    constructor(private ghbClient: GhbServiceClientService,
                private sessionService: SessionUtilService,
                private router: Router) {
    }

    ngOnInit() {
        this.ghbClient.getPageOfIssuesForByUserId(this.currentPage++, this.sessionService.getUser().userId)
            .pipe()
            .subscribe(page => {
                this.totalPages = page.page.totalPages;
                let embedded = page._embedded;
                let issuesList: Issue[] = embedded.issues as Issue[];
                issuesList.forEach((item) => this.issues.push(item));
            });
    }

    @HostListener('window:scroll', ['$event'])
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
        this.router.navigate(['home']);
    }
}
