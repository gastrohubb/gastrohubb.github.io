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

@NgModule({
  declarations: [
    AppComponent,
    ProfilePageComponent,
    BriefInfoBlockComponent,
    ModalLinkBlockComponent,
    HyperLinkBlockComponent,
    AddressModalFormComponent,
    IssuePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
