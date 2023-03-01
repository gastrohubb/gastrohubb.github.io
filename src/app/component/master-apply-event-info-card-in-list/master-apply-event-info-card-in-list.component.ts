import {Component, Input} from '@angular/core';
import {ConfigService} from "../../service/config.service";
import {MasterApplyIssueEvent} from "../../dto/MasterApplyIssueEvent";
import {GhbUser} from "../../dto/GhbUser";
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-master-apply-event-info-card-in-list',
    templateUrl: './master-apply-event-info-card-in-list.component.html',
    styleUrls: ['./master-apply-event-info-card-in-list.component.css']
})
export class MasterApplyEventInfoCardInListComponent {
    @Input()
    masterApplyEvent: MasterApplyIssueEvent = new MasterApplyIssueEvent(null);

    constructor(private configService: ConfigService,
                private http: HttpClient, // todo: remove http client from component, move it on issue page. to do that, there should be a way how to pass events from child component to parent component.
                private config: ConfigService) { // todo: remove dependency on config service from component. that should be on page level.

    }

    getImgById(uuid: string) {
        return this.configService.filesEndpoint() + "/" + uuid;
    }

    onApproveClicked(event: Event) {
        event.preventDefault();
        this.http.post<MasterApplyIssueEvent>(this.config.apiUrl() + "/approveMasterApplicationOnIssue/" + this.masterApplyEvent.masterApplyIssueEventId, {})
            .subscribe({
                next: (response: MasterApplyIssueEvent) => {
                    this.masterApplyEvent = new MasterApplyIssueEvent(response);
                },
                error: (error: any) => {
                    console.error(error);
                }
            });
    }

    onDeclineClicked(event: Event) {
      event.preventDefault();
      this.http.post<MasterApplyIssueEvent>(this.config.apiUrl() + "/declineMasterApplicationOnIssue/" + this.masterApplyEvent.masterApplyIssueEventId, {})
          .subscribe({
            next: (response: MasterApplyIssueEvent) => {
              this.masterApplyEvent = new MasterApplyIssueEvent(response);
            },
            error: (error: any) => {
              console.error(error);
            }
          });
    }
}
