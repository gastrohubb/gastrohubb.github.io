import { Injectable } from '@angular/core';
import {Customer} from "../dto/Customer";
import {HttpClient} from "@angular/common/http";
import {ConfigService} from "./config.service";
import {Master} from "../dto/Master";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private readonly uri: string;

  constructor(private http: HttpClient,
              private config: ConfigService) {

  this.uri = config.apiUrl(); }

  public async findCustomerByGhbUserIdAwait(id: string): Promise<Customer | null> {
    const response = await this.http.get<Customer>(this.uri + "/customers/search/findByGhbUser_UserId?ghbUserId=" + id).toPromise();
    if (response === undefined) {
      return null;
    }
    return response;
  }
  // todo: move to master service? session helper class? get master/customer profile with user profile and cache
  public async findMasterByGhbUserIdAwait(id: string): Promise<Master | null> {
    const response = await this.http.get<Master>(this.uri + "/masters/search/findByGhbUser_UserId?ghbUserId=" + id).toPromise();
    if (response === undefined) {
      return null;
    }
    return response;
  }
}
