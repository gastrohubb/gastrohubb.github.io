import {Component, HostListener} from '@angular/core';
import {Issue} from "../../dto/Issue";
import {GhbServiceClientService} from "../../service/ghb-service-client.service";
import {Router} from "@angular/router";
import {ConfigService} from "../../service/config.service";
import {Master} from "../../dto/Master";

@Component({
  selector: 'app-home-customer-page',
  templateUrl: './home-customer-page.component.html',
  styleUrls: ['./home-customer-page.component.css']
})
export class HomeCustomerPageComponent {
  title: string = 'Masters';
  issues: Issue[] = [];
  masters: Master[] = [];
  scrollThreshold: number = 1000;
  currentPage: number = 0;
  totalPages: number = 0;
  config: any;

  constructor(private ghbClient: GhbServiceClientService,
              private router: Router,
              private configService: ConfigService) {
  }

  ngOnInit() {

    this.ghbClient.getPageOfMasters(this.currentPage++)
        .pipe()
        .subscribe(page => {
          this.totalPages = page.page.totalPages;
          let embedded = page._embedded;
          let masterList: Master[] = embedded.masters as Master[];
            masterList.forEach((master) => this.masters.push(master));
        });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: any) {
    console.log(window.scrollY + this.scrollThreshold)
    if (this.isScrolledToTheBottom() && this.hasNextPage()) {
      this.scrollThreshold = this.scrollThreshold / 10;
      this.ghbClient.getPageOfMasters(this.currentPage++)
          .pipe()
          .subscribe(page => {
            let embedded = page._embedded;
            let masterList: Master[] = embedded.masters as Master[];
              masterList.forEach((master) => this.masters.push(master));
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
    this.ghbClient.getPageOfMasters(0).pipe()
        .subscribe(() => {
          this.ghbClient.getPageOfMasters(0).pipe().subscribe(() => {
          })
        });
  }
}
