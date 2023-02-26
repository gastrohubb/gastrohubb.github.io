import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ProfilePageComponent} from "./page/profile-page/profile-page.component";
import {HomePageComponent} from "./page/home-page/home-page.component";
import {IssuePageComponent} from "./page/issue-page/issue-page.component";
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

const routes: Routes = [
  {path: 'login', component: LoginPageComponent},
  {path: 'register', component: RegisterPageComponent},
  {path: '', component: RoleForkComponent},
  {path: 'master/home', component: HomeMasterPageComponent},
  {path: 'customer/home', component: HomeCustomerPageComponent},
  {path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuardService]},
  {path: 'master/profile', component: MasterProfilePageComponent, canActivate: [AuthGuardService]},
  {path: 'customer/profile', component: CustomerProfilePageComponent, canActivate: [AuthGuardService]},
  {path: 'master/issueForm', component: IssueFormComponent, canActivate: [AuthGuardService]},
  {path: 'customer/issueForm', component: IssueFormComponent, canActivate: [AuthGuardService]},
  {path: 'issueForm', component: IssueFormComponent, canActivate: [AuthGuardService]},
  {path: 'master/myIssues', component: MyIssuesPageComponent, canActivate: [AuthGuardService]},
  {path: 'customer/myIssues', component: MyIssuesPageComponent, canActivate: [AuthGuardService]},
  // {path: 'issues/:id', component: IssuePageComponent, canActivate: [AuthGuardService]},
  {path: 'issues/:id', component: IssueExtendedPageComponent, canActivate: [AuthGuardService]},
  {path: 'master/issues/:id', component: IssueExtendedPageComponent, canActivate: [AuthGuardService]},
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
