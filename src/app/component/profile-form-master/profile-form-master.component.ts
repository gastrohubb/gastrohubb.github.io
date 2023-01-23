import {Component, Input} from '@angular/core';
import {Master} from "../../dto/Master";
import {GhbServiceClientService} from "../../service/ghb-service-client.service";

@Component({
  selector: 'app-profile-form-master',
  templateUrl: './profile-form-master.component.html',
  styleUrls: ['./profile-form-master.component.css']
})
export class ProfileFormMasterComponent {

  master: Master = new Master();
  @Input()
  modalId: any;

  constructor(private ghbClient: GhbServiceClientService) {
  }

  postMaster() {
    let master: Master = Master.masterOf(
      this.master.domain,
      this.master.name,
      this.master.experience,
      this.master.workplace);
    this.ghbClient.saveNewMaster(master);
  }
}
