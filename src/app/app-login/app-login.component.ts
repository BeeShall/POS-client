import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppService } from '../services/app.service'
import { Router } from '@angular/router';

/*

AppLoginComponent

DESCRIPTION: This is a component class for the login page

AUTHOR: BISHAL REGMI

DATE: 2/28/2018

*/

@Component({
	selector: 'app-login',
	templateUrl: 'app-login.component.html',
	styleUrls: ['app-login.component.css']
})

export class AppLoginComponent implements OnInit {
	constructor(private appService: AppService,
		private router: Router) { }

	ngOnInit() { }

	//This method is called when the login button is clicked from the page
	submit(loginForm: NgForm) {
		console.log(loginForm.value)

		//sending an HTTP request for logging in
		this.appService.login(loginForm.value)
			.subscribe(data => {
				if (data["success"]) {
					this.router.navigate(["/"+data["redirect"]])
				}
				else {
					console.log("Error loggin in")
				}
			}, error => {
				console.log(error)
			})
	}
}