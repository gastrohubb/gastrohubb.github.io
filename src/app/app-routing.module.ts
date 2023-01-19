import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ProfilePageComponent} from "./page/profile-page/profile-page.component";
import {HomePageComponent} from "./page/home-page/home-page.component";
import {IssuePageComponent} from "./page/issue-page/issue-page.component";

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'profile', component: ProfilePageComponent},
  {path: 'myIssues', component: IssuePageComponent},
  {path: 'issue', component: IssuePageComponent},
  {path: 'favorites', component: ProfilePageComponent},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
