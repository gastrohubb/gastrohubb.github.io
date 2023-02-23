import {Component, Input} from '@angular/core';
import {Master} from "../../dto/Master";
import {GhbServiceClientService} from "../../service/ghb-service-client.service";

@Component({
  selector: 'app-addres-form-master',
  templateUrl: './address-form-master.component.html',
  styleUrls: ['./address-form-master.component.css']
})
export class AddressFormMasterComponent {

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
