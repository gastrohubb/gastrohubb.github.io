import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ProfilePageComponent } from './page/profile-page/profile-page.component';
import { BriefInfoBlockComponent } from './component/brief-info-block/brief-info-block.component';
import { ModalLinkBlockComponent } from './component/modal-link-block/modal-link-block.component';
import { HyperLinkBlockComponent } from './component/hyper-link-block/hyper-link-block.component';
import { AddressModalFormComponent } from './component/address-modal-form/address-modal-form.component';
import { IssuePageComponent } from './page/issue-page/issue-page.component';
import { ListCardComponent } from './component/list-card/list-card.component';
import { HomePageComponent } from './page/home-page/home-page.component';
import { IssueListComponent } from './component/issue-list/issue-list.component';
import { ProfileFormMasterComponent } from './component/profile-form-master/profile-form-master.component';
import { ProfileFormCustomerComponent } from './component/profile-form-customer/profile-form-customer.component';
import {FormsModule} from "@angular/forms";
import { IssueFormComponent } from './component/issue-form/issue-form.component';
import { MenuBottomComponent } from './component/menu-bottom/menu-bottom.component';
import { LoginPageComponent } from './page/login-page/login-page.component';
import { RegisterPageComponent } from './page/register-page/register-page.component';
import {HttpClientModule} from "@angular/common/http";
import { MyIssuesPageComponent } from './page/my-issues-page/my-issues-page.component';
import { IssueFormPageComponent } from './page/issue-form-page/issue-form-page.component';
import { PageHeaderComponent } from './component/page-header/page-header.component';
import { FavoritsPageComponent } from './page/favorits-page/favorits-page.component';
import { MasterProfileComponent } from './page/master-profile/master-profile.component';
import { CustomerProfileComponent } from './page/customer-profile/customer-profile.component';
import { MasterProfilePageComponent } from './page/master-profile-page/master-profile-page.component';
import { CustomerProfilePageComponent } from './page/customer-profile-page/customer-profile-page.component';
import { MasterInfoBlockComponent } from './component/master-info-block/master-info-block.component';
import { RoleForkComponent } from './page/role-fork/role-fork.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
