import {Component, Input} from '@angular/core';
import {Master} from "../../dto/Master";
import {Customer} from "../../dto/Customer";

@Component({
  selector: 'app-profile-form-customer',
  templateUrl: './profile-form-customer.component.html',
  styleUrls: ['./profile-form-customer.component.css']
})
export class ProfileFormCustomerComponent {
  customer: Customer = new Customer();
  @Input()
  modalId: any;

  save() {
    window.alert(this.customer.name + " " + this.customer.phone + " " + this.customer.ownerName);
  }
}
