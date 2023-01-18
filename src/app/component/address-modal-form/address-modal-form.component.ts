import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-address-modal-form',
  templateUrl: './address-modal-form.component.html',
  styleUrls: ['./address-modal-form.component.css']
})
export class AddressModalFormComponent {
  @Input()
  modalId: any;

}
