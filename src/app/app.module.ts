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
import {EmployeeService} from "./services/employee.service"

import { PageNotFoundComponent } from "./page-not-found/page-not-found.component"
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { AppCustomerModule } from './app-customer/app-customer.modules';
import { CustomerService } from './services/customer.service';
import { AppWaitressComponent } from './app-waitress/app-waitress.component';


@NgModule({
  declarations: [
    AppComponent, AppLoginComponent, PageNotFoundComponent, AppWaitressComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    FormsModule,
    AppAdminModule,
    AppCustomerModule,
    NgbModule.forRoot()
  ],
  providers: [AppService, MenuService, EmployeeService, CustomerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
