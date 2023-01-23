export class Customer {
  customerId: any;
  name: any;
  phone: any;
  ownerName: any;
  ghbUser: any;

  constructor() {
  }

  public static of(name: string, phone: string, ownerName: string): Customer {
    let customer: Customer = new Customer();
    customer.name = name;
    customer.phone = phone;
    customer.ownerName = ownerName;
    return customer;
  }
}
