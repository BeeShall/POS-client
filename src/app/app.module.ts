import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppAdminModule } from './app-admin/app-admin.module';

import { AppComponent } from './app.component';
import {AppRoutingModule } from './app.routing.module'
import { AppLoginComponent } from './app-login/app-login.component'
import { AppService } from "./services/app.service"
import {MenuService} from "./services/menu.service"

import { PageNotFoundComponent } from "./page-not-found/page-not-found.component"
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';


@NgModule({
  declarations: [
    AppComponent, AppLoginComponent, PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    FormsModule,
    AppAdminModule,
    NgbModule.forRoot()
  ],
  providers: [AppService, MenuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
