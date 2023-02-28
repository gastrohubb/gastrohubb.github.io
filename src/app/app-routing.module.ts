import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginPageComponent} from "./page/login-page/login-page.component";
import {RegisterPageComponent} from "./page/register-page/register-page.component";
import {AuthGuardService} from "./service/auth-guard.service";
import {MyIssuesPageComponent} from "./page/my-issues-page/my-issues-page.component";
import {IssueFormComponent} from "./component/issue-form/issue-form.component";
import {FavoritsPageComponent} from "./page/favorits-page/favorits-page.component";
import {MasterProfilePageComponent} from "./page/master-profile-page/master-profile-page.component";
import {CustomerProfilePageComponent} from "./page/customer-profile-page/customer-profile-page.component";
import {RoleForkComponent} from "./page/role-fork/role-fork.component";
import {HomeMasterPageComponent} from "./page/home-master-page/home-master-page.component";
import {HomeCustomerPageComponent} from "./page/home-customer-page/home-customer-page.component";
import {IssueExtendedPageComponent} from "./page/issue-extended-page/issue-extended-page.component";
import {MyIssuesMasterPageComponent} from "./page/my-issues-master-page/my-issues-master-page.component";

const routes: Routes = [
  {path: '', component: RoleForkComponent},
  {path: 'master/login', component: LoginPageComponent},
  {path: 'customer/login', component: LoginPageComponent},
  {path: 'master/register', component: RegisterPageComponent},
  {path: 'customer/register', component: RegisterPageComponent},
  {path: 'master/home', component: HomeMasterPageComponent},
  {path: 'customer/home', component: HomeCustomerPageComponent},
  {path: 'master/profile', component: MasterProfilePageComponent, canActivate: [AuthGuardService]},
  {path: 'customer/profile', component: CustomerProfilePageComponent, canActivate: [AuthGuardService]},
  {path: 'master/issueForm', component: IssueFormComponent, canActivate: [AuthGuardService]},
  {path: 'customer/issueForm', component: IssueFormComponent, canActivate: [AuthGuardService]},
  {path: 'issueForm', component: IssueFormComponent, canActivate: [AuthGuardService]},
  {path: 'master/myIssues', component: MyIssuesMasterPageComponent, canActivate: [AuthGuardService]},
  {path: 'customer/myIssues', component: MyIssuesPageComponent, canActivate: [AuthGuardService]},
  {path: 'master/issues/:id', component: IssueExtendedPageComponent, canActivate: [AuthGuardService]},
  {path: 'customer/issues/:id', component: IssueExtendedPageComponent, canActivate: [AuthGuardService]},
  {path: 'master/favorites', component: FavoritsPageComponent, canActivate: [AuthGuardService]},
  {path: 'customer/favorites', component: FavoritsPageComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
