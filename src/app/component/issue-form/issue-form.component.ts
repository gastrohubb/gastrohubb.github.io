import {Component, Input} from '@angular/core';
import {Issue} from "../../dto/Issue";
import {GhbServiceClientService} from "../../service/ghb-service-client.service";
import {catchError, filter, Observable, pairwise} from "rxjs";
import {Router, RoutesRecognized} from "@angular/router";
import {ContextService} from "../../service/context.service";

@Component({
    selector: 'app-issue-form',
    templateUrl: './issue-form.component.html',
    styleUrls: ['./issue-form.component.css']
})
export class IssueFormComponent {
    issue: Issue = new Issue();
    fileList: any;
    imgSrc: any;
    errorMessage: any;
    @Input()
    previousPage: any;

    constructor(private ghbClient: GhbServiceClientService,
                private router: Router,
                private context: ContextService) {

    }

    ngOnInit() {
        let path: string = this.context.getAppContextPath();
        this.previousPage = path + "/home";

        // todo: navigation to previous page stops working, fix it. for now navigating to home.
        // this.router.events
        //     .pipe(filter((e: any) => e instanceof RoutesRecognized),
        //         pairwise()
        //     ).subscribe((e: any) => {
        //     this.previousPage = e[0].urlAfterRedirects;
        //     console.log(e[0].urlAfterRedirects);
        // });
    }

    save() {
        if (!this.fileList
            || !this.issue.description
            || !this.issue.city) {
            this.errorMessage = "All fields are required"
            return;
        }
        this.ghbClient.saveIssue(this.issue)
            .pipe(catchError(error => {
                console.log("error saving issue:", error);
                return new Observable<never>();
            }))
            .subscribe(issue => {
                this.ghbClient.associateCustomerToIssue(issue.issueId);
                this.ghbClient.saveIssueImages(this.fileList, issue.issueId);

                this.issue = new Issue();
                this.imgSrc = null;
                this.fileList = null;
                this.errorMessage = null;
                let path: string = this.context.getAppContextPath();
                this.router.navigate([path + '/issues', issue.issueId]);
            });

    }

    back() {
        console.log(this.previousPage)
        this.router.navigate([this.previousPage]);
    }


    // At the drag drop area (drop)="onDropFile($event)"
    onDropFile(event: DragEvent) {
        event.preventDefault();
        if (event != null && event.dataTransfer != null) {
            // this.uploadFile(event.dataTransfer.files);
        }
    }

    // At the drag drop area (dragover)="onDragOverFile($event)"
    onDragOverFile(event: Event) {
        event.stopPropagation();
        event.preventDefault();
    }

    // At the file input element (change)="selectFile($event)"
    selectFile(event: Event) {
        if (event != null && event.target != null) {
            const target = event.target as HTMLInputElement;
            if (target.files != null && target.files[0] != null) {
                this.previewFile(target.files)
            }
        }
    }

    previewFile(files: FileList) {
        let file = files[0];
        const reader = new FileReader();
        reader.onload = () => this.imgSrc = reader.result;
        reader.readAsDataURL(file);
        this.fileList = files;
    }
}
