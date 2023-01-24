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

const routes: Routes = [
  {path: 'login', component: LoginPageComponent},
  {path: 'register', component: RegisterPageComponent},
  {path: '', component: HomePageComponent},
  {path: 'home', component: HomePageComponent},
  {path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuardService]},
  {path: 'issueForm', component: IssueFormComponent, canActivate: [AuthGuardService]},
  {path: 'myIssues', component: MyIssuesPageComponent, canActivate: [AuthGuardService]},
  {path: 'issues/:id', component: IssuePageComponent, canActivate: [AuthGuardService]},
  {path: 'favorites', component: ProfilePageComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
