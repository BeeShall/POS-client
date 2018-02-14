import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppAdminComponent } from './app-admin.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { EmployeeComponent } from './employee/employee.component';
import { MenuComponent } from './menu/menu.component';
import { AddMenuComponent } from './menu/add-menu/add-menu.component';


@NgModule({
	imports: [FormsModule, CommonModule, NgbModule],
	exports: [],
	declarations: [AppAdminComponent, EmployeeComponent, MenuComponent,  AddMenuComponent],
	entryComponents : [ AddMenuComponent],
	providers: [],
})
export class AppAdminModule { }
