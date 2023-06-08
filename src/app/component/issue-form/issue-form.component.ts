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
    issue: Issue = new Issue(null);
    fileList: File[] = [];
    imgSrcList: string[] = [];
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
        console.log("save button pressed");
        if (!this.fileList
            || !this.issue.description
            || !this.issue.city) {
            this.errorMessage = $localize `All fields are required`;
            return;
        }
        console.log("49");
        const issueFormData = this.prepareFormData(this.issue);
        console.log("saving issue");
        this.ghbClient.saveCustomerIssueWithImages(issueFormData)
            .pipe(catchError(error => {
                console.log("error saving issue:", error);
                console.log("issue not saved")
                return new Observable<never>();
            }))
            .subscribe(issue => {
                console.log("navigating to list of issues")
                this.issue = new Issue(null);
                this.imgSrcList = [];
                this.fileList = [];
                this.errorMessage = null;
                let path: string = this.context.getAppContextPath();
                this.router.navigate([path + '/issues', issue.issueId]);
            });
    }

    prepareFormData(issue: Issue): FormData {
        console.log("prepareFormData");
        const formData = new FormData();
        formData.append(
            'issue',
            new Blob([JSON.stringify(issue)], {type: 'application/json'})
        );

        for(const element of this.fileList) {
            console.log("appending");
            formData.append('images', element);
        }
        console.log("returning");
        return formData;
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
        if (event && event.target) {
            const target = event.target as HTMLInputElement;
            if (target.files && target.files.length > 0) {
                const selectedFiles = Array.from(target.files);
                const validationError = this.validateFiles(selectedFiles);
                if (!validationError) {
                    this.fileList.push(...selectedFiles);
                    this.previewFile(this.fileList);
                } else {
                    this.errorMessage = validationError;
                }
            }
        }
    }

    validateFiles(files: File[]): string | null {
        const maxSizePerFile = 1024 * 1024 * 5;
        const maxSizeTotal = 1024 * 1024 * 6;
        const pattern: RegExp = /^image\//;
        let totalSize = this.fileList.reduce((sum, file) => sum + file.size, 0);

        for (const file of files) {
            if (file.size > maxSizePerFile) {
                console.log(`File "${file.name}" is too big. Maximum file size is 5MB`)
                return `File "${file.name}" is too big. Maximum file size is 5MB`;
            }

            if (!pattern.test(file.type)) {
                console.log(`File "${file.name}" is not an image`)
                return `File "${file.name}" is not an image`;
            }
            totalSize += file.size;
        }

        if (totalSize > maxSizeTotal) {
            console.log("The total size of selected files exceeds the maximum limit of 50MB")
            return "The total size of selected files exceeds the maximum limit of 50MB";
        }

        return null;
    }

    previewFile(files: File[]) {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            reader.onload = () => {
                this.imgSrcList[i] = reader.result as string;
            };
            reader.readAsDataURL(file);
        }
    }
}
