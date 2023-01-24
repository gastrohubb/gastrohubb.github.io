export class Customer {
  customerId: any;
  name: any;
  phone: any;
  ownerName: any;
  ghbUser: any;
  _links: any;

  constructor() {
  }

  public static fromJson(json:any): Customer {
    let customer: Customer = new Customer();
    customer.customerId = json.customerId;
    customer.name = json.name;
    customer.phone = json.phone;
    customer.ownerName = json.ownerName;
    customer.ghbUser = json.ghbUser;
    customer._links = json._links;
    return customer;
  }

  public static of(name: string, phone: string, ownerName: string): Customer {
    let customer: Customer = new Customer();
    customer.name = name;
    customer.phone = phone;
    customer.ownerName = ownerName;
    return customer;
  }
}
