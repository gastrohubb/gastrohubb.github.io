import {Component} from '@angular/core';
import {Issue} from "../../dto/Issue";
import {GhbServiceClientService} from "../../service/ghb-service-client.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ContextService} from "../../service/context.service";

@Component({
    selector: 'app-issue-page',
    templateUrl: './issue-page.component.html',
    styleUrls: ['./issue-page.component.css']
})
export class IssuePageComponent {
    issue: Issue = new Issue(null);
    tries: number = 0; //todo: it not loading full data from first attempt. should be fixed.

    constructor(private ghbClient: GhbServiceClientService,
                private router: ActivatedRoute,
                private navigate: Router,
                private context: ContextService) {
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
                })
        }
    }

    isMaster() {
        console.log("path" + this.context.getAppContextPath())
        return this.context.getAppContextPath() === "master";
    }
}
