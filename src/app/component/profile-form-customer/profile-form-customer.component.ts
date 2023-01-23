import {Component, Input} from '@angular/core';
import {Customer} from "../../dto/Customer";
import {GhbServiceClientService} from "../../service/ghb-service-client.service";

@Component({
  selector: 'app-profile-form-customer',
  templateUrl: './profile-form-customer.component.html',
  styleUrls: ['./profile-form-customer.component.css']
})
export class ProfileFormCustomerComponent {
  customer: Customer = new Customer();
  @Input()
  modalId: any;

  constructor(private ghbClient:GhbServiceClientService) {
  }

  save() {
    let customer: Customer = Customer.of(this.customer.name,this.customer.phone,this.customer.ownerName);
    this.ghbClient.saveNewCustomer(customer);
  }
}
