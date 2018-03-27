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
import { SocketService } from './services/socket.service';
import { AddOrderComponent } from './app-waitress/add-order/add-order.component';
import { WaitressService } from './services/waitress.service';
import { MainPipeModule } from './pipes/main-pipe.module';
import { CloseOrderComponent } from './app-waitress/add-order/close-order/close-order.component';
import { AppWaitressModule } from './app-waitress/app-waitress.module';


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
    AppCustomerModule,
    AppWaitressModule,
    NgbModule.forRoot(),
    MainPipeModule
  ],
  providers: [AppService, MenuService, EmployeeService, CustomerService, SocketService, WaitressService],
  entryComponents:[],
  bootstrap: [AppComponent]
})
export class AppModule { }
