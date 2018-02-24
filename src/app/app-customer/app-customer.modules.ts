import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppCustomerComponent } from './app-customer.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { RouterModule } from '@angular/router';
import { DisplayMenuComponent } from './display-menu/display-menu.component';
import { OrdersComponent } from './orders/orders.component';
import { ViewDetailsComponent } from './display-menu/view-details/view-details.component';


@NgModule({
	imports: [FormsModule, CommonModule, NgbModule, ReactiveFormsModule, RouterModule],
	exports: [],
	declarations: [AppCustomerComponent, DisplayMenuComponent, OrdersComponent, ViewDetailsComponent],
	entryComponents : [ ViewDetailsComponent],
	providers: [],
})
export class AppCustomerModule { }
