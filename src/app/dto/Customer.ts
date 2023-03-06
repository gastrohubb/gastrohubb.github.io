import {GhbUser} from "./GhbUser";
import {Master} from "./Master";

export class Customer {
  customerId: any;
  name: string = "anonymous";
  phone: string = "phone doesn't set";
  ownerName: string = "anonymous";
  ghbUser: GhbUser = new GhbUser();
  _links: any;


  constructor(data: any) {
    this.customerId = data?.customerId ? data.customerId : '';
    this.name = data?.name ? data.name : "anonymous";
    this.phone = data?.phone ? data.phone : "phone doesn't set";
    this.ownerName = data?.ownerName ? data.ownerName : "anonymous";
    this.ghbUser = data?.ghbUser;
    this._links = data?.links;
  }

  public static fromJson(json:any): Customer {
    let customer: Customer = new Customer(null);
    customer.customerId = json.customerId;
    customer.name = json.name;
    customer.phone = json.phone;
    customer.ownerName = json.ownerName;
    customer.ghbUser = json.ghbUser;
    customer._links = json._links;
    return customer;
  }

  public static of(name: string, phone: string, ownerName: string): Customer {
    let customer: Customer = new Customer(null);
    customer.name = name;
    customer.phone = phone;
    customer.ownerName = ownerName;
    return customer;
  }
}
