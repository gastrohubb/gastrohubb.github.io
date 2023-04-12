import {Component, HostListener} from '@angular/core';
import {Issue} from "../../dto/Issue";
import {GhbServiceClientService} from "../../service/ghb-service-client.service";
import {Router} from "@angular/router";
import {ConfigService} from "../../service/config.service";
import {ContextService} from "../../service/context.service";

@Component({
    selector: 'app-home-master-page',
    templateUrl: './home-master-page.component.html',
    styleUrls: ['./home-master-page.component.css']
})
export class HomeMasterPageComponent {
    txtIssues: string = $localize `Issues`;
    issues: Issue[] = [];
    scrollThreshold: number = 1000;
    currentPage: number = 0;
    totalPages: number = 0;
    config: any;
    currentPagePath: any;
    contextPath: string;

    constructor(private ghbClient: GhbServiceClientService,
                private router: Router,
                private configService: ConfigService,
                private context: ContextService) {
        this.contextPath = context.getAppContextPath();
    }

    ngOnInit() {
        this.currentPagePath = this.router.url;
        this.ghbClient.getPageOfIssues(this.currentPage++)
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
            this.ghbClient.getPageOfIssues(this.currentPage++)
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
        this.ghbClient.getPageOfIssues(0).pipe()
            .subscribe(() => {
                this.ghbClient.getPageOfIssues(0).pipe().subscribe(() => {
                })
            });
    }
}
