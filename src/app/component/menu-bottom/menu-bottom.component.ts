import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {AuthGuardService} from "../../service/auth-guard.service";
import {ContextService} from "../../service/context.service";
import {Router} from "@angular/router";
import {AlertService} from "../../service/alert.service";
import {SessionUtilService} from "../../service/session-util.service";
import {NotificationService} from "../../service/notification.service";


@Component({
    selector: 'app-menu-bottom',
    templateUrl: './menu-bottom.component.html',
    styleUrls: ['./menu-bottom.component.css']
})
export class MenuBottomComponent {
    @ViewChild('alertsContainer', { static: false }) alertsContainer!: ElementRef;

    @Input()
    appContext: string = "";
    appContextPath: string = window.location.pathname;
    @Input()
    currentPagePath: any;
    setClass: boolean = false;

    colClass: string = "col";
    linkClass = "text-dark small font-weight-bold text-decoration-none";
    activeLinkClass = "text-danger small font-weight-bold text-decoration-none";
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
    user: string = "";

    masterAppContext: string = "/master";
    customerAppContext: string = "/customer";

    home: string = "/home";
    myIssues: string = "/myIssues";
    issueForm: string = "/issueForm";
    favorites: string = "/favorites";
    profile: string = "/profile";

    constructor(private authGuardService: AuthGuardService,
                public context: ContextService,
                private router: Router,
                public alertService: AlertService,
                public sessionUtil: SessionUtilService,
                public notifications: NotificationService) {
    }

    ngOnInit(): void {
        this.notifications.startCheckingEndpoint();
        let userJson = sessionStorage.getItem("user");
        if (userJson != null) {
            this.user = userJson;
        }
        this.setRoleContextToNavigationLinks();

        switch (window.location.pathname) { //todo: looks like this doesn't used
            case "/home":
                this.homeColClass = this.colClass + " selected";
                this.myIssuesColClass = this.colClass;
                this.favoritesColClass = this.colClass;
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
                this.favoritesColClass = this.colClass;
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
                this.favoritesColClass = this.colClass + " selected";
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
                this.favoritesColClass = this.colClass;
                this.profileColClass = this.colClass;

                this.homeLinkClass = this.linkClass
                this.myIssuesLinkClass = this.linkClass.replaceAll("text-dark", this.textDanger);
                this.favoritesLinkClass = this.linkClass;
                this.profileLinkClass = this.linkClass;

                this.homeIconClass = "feather-home";
                this.myIssuesIconClass = "feather-map-pin " + this.textDanger;
                this.favoritesIconClass = "feather-heart";
                this.profileIconClass = "feather-user";
                break;
        }

        for (let alert of this.alertService.alerts) {
            if (document.getElementById(alert.elementId)) {
                this.alertService.dismissAlert(alert)
            }
        }


    }

    private setRoleContextToNavigationLinks() {
        switch (this.context.getAppContextPath()) {
            case "master":
                this.home = this.masterAppContext + this.home;
                this.myIssues = this.masterAppContext + this.myIssues;
                this.issueForm = this.masterAppContext + this.issueForm;
                this.favorites = this.masterAppContext + this.favorites;
                this.profile = this.masterAppContext + this.profile;
                break;
            case "customer":
                this.home = this.customerAppContext + this.home;
                this.myIssues = this.customerAppContext + this.myIssues;
                this.issueForm = this.customerAppContext + this.issueForm;
                this.favorites = this.customerAppContext + this.favorites;
                this.profile = this.customerAppContext + this.profile;
                break;
        }
    }

    isActive(path: string): boolean {
        return this.router.url.startsWith(path);
    }

    canActivateOrRedirectToLogin(): boolean {
    //     console.log("canActivateOrRedirectToLogin")
    //     return this.checkIfCustomerFillInfo()
    //     // todo: add secure
    //     // return this.authGuardService.canActivateOrRedirectToLogin();
        return true;
    }

    canActivateOrNot(): boolean {
        return true;
        // todo: add secure
        // return this.authGuardService.canActivateOrNot();
    }

    isCustomer() {
        return this.appContext === 'customer'

        ;
    }

    dismissAlert(alert: any) {
        this.alertService.dismissAlert(alert);
    }
}
