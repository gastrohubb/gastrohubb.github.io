// create different dto for send data, and receive data. Server can send complex objects, but can't receive them.
export class Issue {
  issueId: any;
  description: any;
  photo: any;
  city: any;
  issueStatus: any;
  timestamp: any;
  customer: any;
  _links: any;
}
