import {Component, Input} from '@angular/core';
import {Issue} from "../../dto/Issue";

@Component({
    selector: 'app-issue-list',
    templateUrl: './issue-list.component.html',
    styleUrls: ['./issue-list.component.css']
})
export class IssueListComponent {
    @Input()
    issues: Issue[] = [];
    @Input()
    contextPath: string = "";
}
