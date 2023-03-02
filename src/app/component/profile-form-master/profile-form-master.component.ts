import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Master} from "../../dto/Master";
import {GhbServiceClientService} from "../../service/ghb-service-client.service";
import {SessionUtilService} from "../../service/session-util.service";

@Component({
    selector: 'app-profile-form-master',
    templateUrl: './profile-form-master.component.html',
    styleUrls: ['./profile-form-master.component.css']
})
export class ProfileFormMasterComponent {

    master: Master = new Master();
    @Input()
    modalId: any;
    @Output()
    formUpdatedEventToParent = new EventEmitter<void>();

    constructor(private ghbClient: GhbServiceClientService,
                private session: SessionUtilService) {
        ghbClient.findMasterByGhbUserId(session.getUser().userId).subscribe({
            next: (response: Master) => {
                this.master = response;
            },
            error: (error: any) => {
                console.log(error);
            }
        });
    }

    postMaster() {
        let master: Master = Master.masterOf(
            this.master.domain,
            this.master.name,
            this.master.experience,
            this.master.workplace);
        this.ghbClient.registerNewMaster(master).subscribe(); //also updates
        this.formUpdatedEventToParent.emit();
    }
}
