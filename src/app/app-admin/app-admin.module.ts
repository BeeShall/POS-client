import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppAdminComponent } from './app-admin.component';

import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { AddMenuComponent } from './add-menu/add-menu.component';

@NgModule({
	imports: [FormsModule],
	exports: [],
	declarations: [AppAdminComponent, AddEmployeeComponent, AddMenuComponent],
	providers: [],
})
export class AppAdminModule { }
