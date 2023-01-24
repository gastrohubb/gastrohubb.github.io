import {Component, HostListener, Input} from '@angular/core';
import {Issue} from "../../dto/Issue";
import {GhbServiceClientService} from "../../service/ghb-service-client.service";

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css']
})
export class IssueListComponent {
  @Input()
  issues: Issue[] = [];
  // scrollThreshold: number = 1000;
  // currentPage: number = 0;
  // totalPages: number = 0;
  //
  //
  // constructor(private ghbClient: GhbServiceClientService) {
  // }
  //
  // ngOnInit() {
  //   this.ghbClient.getPageOfIssues(this.currentPage++)
  //     .pipe()
  //     .subscribe(page => {
  //       this.totalPages = page.page.totalPages;
  //       let embedded = page._embedded;
  //       let issuesList: Issue[] = embedded.issues as Issue[];
  //       issuesList.forEach((item) => this.issues.push(item));
  //     });
  // }
  //
  // @HostListener('window:scroll', ['$event'])
  // onWindowScroll(event: any) {
  //   console.log(window.scrollY + this.scrollThreshold)
  //   if (this.isScrolledToTheBottom() && this.hasNextPage()) {
  //     this.scrollThreshold = this.scrollThreshold / 10;
  //     this.ghbClient.getPageOfIssues(this.currentPage++)
  //       .pipe()
  //       .subscribe(page => {
  //         let embedded = page._embedded;
  //         let issuesList: Issue[] = embedded.issues as Issue[];
  //         issuesList.forEach((item) => this.issues.push(item));
  //         this.scrollThreshold = this.scrollThreshold * 10;
  //       });
  //   }
  // }
  //
  // private isScrolledToTheBottom(): boolean {
  //   return window.scrollY + this.scrollThreshold > document.body.scrollHeight;
  // }
  //
  // private hasNextPage(): boolean {
  //   return this.currentPage < this.totalPages;
  // }
}
