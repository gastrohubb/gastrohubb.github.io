import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ContextService {

  constructor(private router: Router) {
  }

  public getAppContextPath() {
    return this.router.url.substring(1, this.router.url.indexOf("/", 1));
  }
}
