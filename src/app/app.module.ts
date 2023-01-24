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
