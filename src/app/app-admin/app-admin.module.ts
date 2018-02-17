import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppAdminComponent } from './app-admin.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { EmployeeComponent } from './employee/employee.component';
import { MenuComponent } from './menu/menu.component';
import { AddMenuComponent } from './menu/add-menu/add-menu.component';
import {AddEmployeeComponent} from './employee/add-employee/add-employee.component'


@NgModule({
	imports: [FormsModule, CommonModule, NgbModule],
	exports: [],
	declarations: [AppAdminComponent, EmployeeComponent, MenuComponent,  AddMenuComponent, AddEmployeeComponent],
	entryComponents : [ AddMenuComponent, AddEmployeeComponent],
	providers: [],
})
export class AppAdminModule { }
