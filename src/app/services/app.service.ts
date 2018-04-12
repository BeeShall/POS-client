import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*

AppService

DESCRIPTION: This is a service class for the intial actions of the application i.e login

	The return types of all the methods in the service are Observables

AUTHOR: BISHAL REGMI

DATE: 2/28/2018

*/

@Injectable()
export class AppService {

	//base url for REST API
	private apiUrl = "http://localhost:5000/api/";

	//header data for the HTTP call
	private headers = new Headers({'Content-Type':'application/json','Access-Control-Allow-Origin': '*'})
	private options = new RequestOptions({headers: this.headers});

	constructor(private http: Http) { }
	
	/*
		DESCRIPTION:
			This method is used to verify login for the servers anf admins

		PARAMETERS:
			data: JSON containing login data

	*/
	login(data) : Observable<any>{
		return this.http.post(this.apiUrl+"login", data, this.options)
			.map((res:Response) => res.json());
	}
}