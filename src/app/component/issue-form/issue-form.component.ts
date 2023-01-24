import {Component, Input} from '@angular/core';
import {Issue} from "../../dto/Issue";
import {GhbServiceClientService} from "../../service/ghb-service-client.service";
import {catchError, Observable} from "rxjs";
import {Router} from "@angular/router";

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


  constructor(private ghbClient: GhbServiceClientService,
              private router: Router) {
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
        this.router.navigate(['issues', issue.issueId]);
      });

  }

  back() {
    //todo: navigate on previous page
    this.router.navigate(['home']);
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
