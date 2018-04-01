import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppService } from '../services/app.service'
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: 'app-login.component.html',
	styleUrls: ['app-login.component.css']
})

export class AppLoginComponent implements OnInit {
	constructor(private appService: AppService,
		private router: Router) { }

	ngOnInit() { }

	submit(loginForm: NgForm) {
		console.log(loginForm.value)
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