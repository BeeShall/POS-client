import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLoginComponent } from './app-login/app-login.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { AddMenuComponent } from './app-admin/add-menu/add-menu.component'
import { AddEmployeeComponent } from './app-admin/add-employee/add-employee.component';

const routes: Routes = [
	{ path : '', redirectTo: '/login', pathMatch:'full'},
	{ path :'login', component: AppLoginComponent},
	{path: "admin/menu", component: AddMenuComponent},
	{path: "admin/employee", component: AddEmployeeComponent},
	{ path: '**', component: PageNotFoundComponent }
]

@NgModule({
	imports: [ RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class AppRoutingModule{ }