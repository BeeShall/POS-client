import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLoginComponent } from './app-login/app-login.component'

const routes: Routes = [
	{ path : '', redirectTo: '/login', pathMatch:'full'},
	{ path :'login', component: AppLoginComponent}
]

@NgModule({
	imports: [ RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class AppRoutingModule{ }