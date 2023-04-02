import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ProfilePageComponent} from './page/profile-page/profile-page.component';
import {BriefInfoBlockComponent} from './component/brief-info-block/brief-info-block.component';
import {ModalLinkBlockComponent} from './component/modal-link-block/modal-link-block.component';
import {HyperLinkBlockComponent} from './component/hyper-link-block/hyper-link-block.component';
import {AddressModalFormComponent} from './component/address-modal-form/address-modal-form.component';
import {IssuePageComponent} from './page/issue-page/issue-page.component';
import {ListCardComponent} from './component/list-card/list-card.component';
import {HomePageComponent} from './page/home-page/home-page.component';
import {IssueListComponent} from './component/issue-list/issue-list.component';
import {ProfileFormMasterComponent} from './component/profile-form-master/profile-form-master.component';
import {ProfileFormCustomerComponent} from './component/profile-form-customer/profile-form-customer.component';
import {FormsModule} from "@angular/forms";
import {IssueFormComponent} from './component/issue-form/issue-form.component';
import {MenuBottomComponent} from './component/menu-bottom/menu-bottom.component';
import {LoginPageComponent} from './page/login-page/login-page.component';
import {RegisterPageComponent} from './page/register-page/register-page.component';
import {HttpClientModule} from "@angular/common/http";
import {MyIssuesPageComponent} from './page/my-issues-page/my-issues-page.component';
import {IssueFormPageComponent} from './page/issue-form-page/issue-form-page.component';
import {PageHeaderComponent} from './component/page-header/page-header.component';
import {FavoritsPageComponent} from './page/favorits-page/favorits-page.component';
import {MasterProfileComponent} from './page/master-profile/master-profile.component';
import {CustomerProfileComponent} from './page/customer-profile/customer-profile.component';
import {MasterProfilePageComponent} from './page/master-profile-page/master-profile-page.component';
import {CustomerProfilePageComponent} from './page/customer-profile-page/customer-profile-page.component';
import {MasterInfoBlockComponent} from './component/master-info-block/master-info-block.component';
import {RoleForkComponent} from './page/role-fork/role-fork.component';
import {CustomerInfoBlockComponent} from './component/customer-info-block/customer-info-block.component';
import {HomeMasterPageComponent} from './page/home-master-page/home-master-page.component';
import {HomeCustomerPageComponent} from './page/home-customer-page/home-customer-page.component';
import {MasterListComponent} from './component/master-list/master-list.component';
import {MasterInfoCardInListComponent} from './component/master-info-card-in-list/master-info-card-in-list.component';
import {HyperLinkBlockComponentLinkedToModalComponent} from './component/hyper-link-block-component-linked-to-modal/hyper-link-block-component-linked-to-modal.component';
import {ModalLinkWithIconBlockComponentComponent} from './component/modal-link-with-icon-block-component/modal-link-with-icon-block-component.component';
import {AddressFormMasterComponent} from './component/addres-form-master/address-form-master.component';
import {IssueExtendedPageComponent} from './page/issue-extended-page/issue-extended-page.component';
import {DatePipe} from "@angular/common";
import { MyIssuesMasterPageComponent } from './page/my-issues-master-page/my-issues-master-page.component';
import { MasterAppliedIssueCardComponent } from './component/master-applied-issue-card/master-applied-issue-card.component';
import { MasterApplyEventInfoCardInListComponent } from './component/master-apply-event-info-card-in-list/master-apply-event-info-card-in-list.component';
import { FavoritesMasterPageComponent } from './page/favorites-master-page/favorites-master-page.component';
import { FavoritesCustomerPageComponent } from './page/favorites-customer-page/favorites-customer-page.component';
import { MyIssuesCustomerPageComponent } from './page/my-issues-customer-page/my-issues-customer-page.component';
import {initializeKeycloak} from "./init/keycloak-init.factory";
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";

@NgModule({
    declarations: [
        AppComponent,
        ProfilePageComponent,
        BriefInfoBlockComponent,
        ModalLinkBlockComponent,
        HyperLinkBlockComponent,
        AddressModalFormComponent,
        IssuePageComponent,
        ListCardComponent,
        HomePageComponent,
        IssueListComponent,
        ProfileFormMasterComponent,
        ProfileFormCustomerComponent,
        IssueFormComponent,
        MenuBottomComponent,
        LoginPageComponent,
        RegisterPageComponent,
        MyIssuesPageComponent,
        IssueFormPageComponent,
        PageHeaderComponent,
        FavoritsPageComponent,
        MasterProfileComponent,
        CustomerProfileComponent,
        MasterProfilePageComponent,
        CustomerProfilePageComponent,
        MasterInfoBlockComponent,
        RoleForkComponent,
        CustomerInfoBlockComponent,
        HomeMasterPageComponent,
        HomeCustomerPageComponent,
        MasterListComponent,
        MasterInfoCardInListComponent,
        HyperLinkBlockComponentLinkedToModalComponent,
        ModalLinkWithIconBlockComponentComponent,
        AddressFormMasterComponent,
        IssueExtendedPageComponent,
        MyIssuesMasterPageComponent,
        MasterAppliedIssueCardComponent,
        MasterApplyEventInfoCardInListComponent,
        FavoritesMasterPageComponent,
        FavoritesCustomerPageComponent,
        MyIssuesCustomerPageComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        KeycloakAngularModule
    ],
    providers: [
        HttpClientModule,
        DatePipe,
        {
            provide: APP_INITIALIZER,
            useFactory: initializeKeycloak,
            multi: true,
            deps: [KeycloakService]
        }],
    bootstrap: [AppComponent]
})
export class AppModule {
}
