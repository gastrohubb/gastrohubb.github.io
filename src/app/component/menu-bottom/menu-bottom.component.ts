import { Component } from '@angular/core';
import {RouterStateSnapshot} from "@angular/router";

@Component({
  selector: 'app-menu-bottom',
  templateUrl: './menu-bottom.component.html',
  styleUrls: ['./menu-bottom.component.css']
})
export class MenuBottomComponent {
  colClass: string = "col";
  linkClass = "text-dark small font-weight-bold text-decoration-none";
  textDanger = "text-danger";
  homeIconClass: string = "feather-home";
  myIssuesIconClass: string = "feather-map-pin";
  favoritesIconClass: string = "feather-heart";
  profileIconClass: string = "feather-user";

  homeColClass: string = this.colClass;
  myIssuesColClass: string = this.colClass;
  favoritesColClass: string = this.colClass;
  profileColClass: string = this.colClass;

  homeLinkClass: string = this.linkClass;
  myIssuesLinkClass: string = this.linkClass;
  favoritesLinkClass: string = this.linkClass;
  profileLinkClass: string = this.linkClass;


  ngOnInit(): void {
    switch (window.location.pathname) {
      case "/home":
        this.homeColClass = this.colClass + " selected";
        this.myIssuesColClass = this.colClass;
        this.favoritesColClass= this.colClass;
        this.profileColClass = this.colClass;

        this.homeLinkClass = this.linkClass.replaceAll("text-dark", this.textDanger);
        this.myIssuesLinkClass = this.linkClass;
        this.favoritesLinkClass = this.linkClass;
        this.profileLinkClass = this.linkClass;

        this.homeIconClass = "feather-home " + this.textDanger;
        this.myIssuesIconClass = "feather-map-pin";
        this.favoritesIconClass = "feather-heart";
        this.profileIconClass = "feather-user";
        break;
      case "/profile":
        this.homeColClass = this.colClass;
        this.myIssuesColClass = this.colClass;
        this.favoritesColClass= this.colClass;
        this.profileColClass = this.colClass + " selected";

        this.homeLinkClass = this.linkClass
        this.myIssuesLinkClass = this.linkClass;
        this.favoritesLinkClass = this.linkClass;
        this.profileLinkClass = this.linkClass.replaceAll("text-dark", this.textDanger);

        this.homeIconClass = "feather-home";
        this.myIssuesIconClass = "feather-map-pin";
        this.favoritesIconClass = "feather-heart";
        this.profileIconClass = "feather-user " + this.textDanger;
        break;
      case "/favorites":
        this.homeColClass = this.colClass;
        this.myIssuesColClass = this.colClass;
        this.favoritesColClass= this.colClass + " selected";
        this.profileColClass = this.colClass;

        this.homeLinkClass = this.linkClass
        this.myIssuesLinkClass = this.linkClass;
        this.favoritesLinkClass = this.linkClass.replaceAll("text-dark", this.textDanger);
        this.profileLinkClass = this.linkClass;

        this.homeIconClass = "feather-home";
        this.myIssuesIconClass = "feather-map-pin";
        this.favoritesIconClass = "feather-heart " + this.textDanger;
        this.profileIconClass = "feather-user";
        break;
      case "/myIssues":
        this.homeColClass = this.colClass;
        this.myIssuesColClass = this.colClass + " selected";
        this.favoritesColClass= this.colClass;
        this.profileColClass = this.colClass;

        this.homeLinkClass = this.linkClass
        this.myIssuesLinkClass = this.linkClass.replaceAll("text-dark", this.textDanger);;
        this.favoritesLinkClass = this.linkClass;
        this.profileLinkClass = this.linkClass;

        this.homeIconClass = "feather-home";
        this.myIssuesIconClass = "feather-map-pin " + this.textDanger;
        this.favoritesIconClass = "feather-heart";
        this.profileIconClass = "feather-user";
        break;
    }
  }
}
