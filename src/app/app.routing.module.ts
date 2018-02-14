import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLoginComponent } from './app-login/app-login.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { MenuComponent } from './app-admin/menu/menu.component';
import { EmployeeComponent } from './app-admin/employee/employee.component';

const routes: Routes = [
	{ path : '', redirectTo: '/login', pathMatch:'full'},
	{ path :'login', component: AppLoginComponent},
	{path: "admin/menu", component: MenuComponent},
	{path: "admin/employee", component: EmployeeComponent},
	{ path: '**', component: PageNotFoundComponent }
]

@NgModule({
	imports: [ RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class AppRoutingModule{ }