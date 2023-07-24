// create different dto for send data, and receive data. Server can send complex objects, but can't receive them.
import {Customer} from "./Customer";
import {ImageUuidContainer} from "./ImageUuidContainer";

export class Issue {
  issueId: string;
  description: string;
  photo: any;
  city: string;
  address: string;
  issueStatus: string;
  timestamp: string;
  customer: Customer;
  _links: any;
  imageUuidContainer: ImageUuidContainer[] = [];
  lat: string;
  lng: string;


  constructor(data: any) {
    this.issueId = data?.issueId;
    this.description = data?.description;
    this.photo = data?.photo;
    this.city = data?.city;
    this.address = data?.address;
    this.issueStatus = data?.issueStatus;
    this.timestamp = data?.timestamp;
    this.customer = new Customer(data?.customer);
    this._links = data?.links;
    this.imageUuidContainer = data?.imageUuidContainer;
    this.lat = data?.lat;
    this.lng = data?.lng;
  }
}
