import {Component, Input} from '@angular/core';
import {Master} from "../../dto/Master";

@Component({
  selector: 'app-profile-form-master',
  templateUrl: './profile-form-master.component.html',
  styleUrls: ['./profile-form-master.component.css']
})
export class ProfileFormMasterComponent {

  master: Master = new Master();
  @Input()
  modalId: any;

  postMaster() {
    window.alert(this.master.domain + " " + this.master.name + " " + this.master.experience + " " + this.master.workplace);
  }
}
