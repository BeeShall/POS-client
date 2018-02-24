import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppService } from '../services/app.service'

@Component({
	selector: 'app-login',
	templateUrl: 'app-login.component.html',
	styleUrls :['app-login.component.css']
})

export class AppLoginComponent implements OnInit {
	constructor(private appService : AppService) { }

	ngOnInit() { }

	submit(loginForm: NgForm){
		console.log(loginForm.value)
		this.appService.login(loginForm.value)
			.subscribe(data => {
				console.log(data)
			}, error => {
				console.log(error)
			})
	}
}