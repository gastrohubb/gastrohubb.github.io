import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Customer} from "../../dto/Customer";
import {GhbServiceClientService} from "../../service/ghb-service-client.service";
import {SessionUtilService} from "../../service/session-util.service";

@Component({
    selector: 'app-profile-form-customer',
    templateUrl: './profile-form-customer.component.html',
    styleUrls: ['./profile-form-customer.component.css']
})
export class ProfileFormCustomerComponent {
    customer: Customer = new Customer(null);
    @Input()
    modalId: any;
    @Output()
    formUpdatedEventToParent = new EventEmitter<void>();

    constructor(private ghbClient: GhbServiceClientService,
                private session: SessionUtilService) {
        ghbClient.findCustomerByGhbUserId(session.getUser().userId).subscribe({
            next: (response: Customer) => {
                this.customer = response;
            },
            error: (error: any) => {
                console.log(error);
            }
        });
    }

    save() {
        let customer: Customer = Customer.of(this.customer.name, this.customer.phone, this.customer.ownerName);
        this.ghbClient.registerNewCustomer(customer).subscribe(); //also updates
        this.formUpdatedEventToParent.emit();
    }
}
