import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Employee} from "../dataModels/employee";

/*

EmployeeService

DESCRIPTION: This is a service class for the APIs that need to be accessed by the admin to update employee details

	The return types of all the methods in the service are Observables

AUTHOR: BISHAL REGMI

DATE: 2/28/2018

*/

@Injectable()
export class EmployeeService {

	//base URL for the API
	private apiUrl = "http://localhost:5000/api/";

	//headers for the HTTP call
	private headers = new Headers({'Content-Type':'application/json','Access-Control-Allow-Origin': '*'})
	private options = new RequestOptions({headers: this.headers});

	constructor(private http: Http) { }
	
	//this method gets all the employees exisiting in the database
	getAllEmployees() : Observable<Employee>{
		return this.http.get(this.apiUrl+"getAllEmployees", this.options)
			.map((res:Response) => res.json());
	}

	//this method adds an employee to the database
	//PARAMETERS: emlployee : employee details to add ob type Employee
	addEmployee(employee:Employee) : Observable<Employee>{
		return this.http.post(this.apiUrl+"addEmployee", employee, this.options)
			.map((res:Response) => res.json());
	}

	//this method is used to update details for a specific employee
	//PARAMETERS: emlployee : employee details to update of type Employee
	updateEmployee(employee:Employee) : Observable<Employee>{
		return this.http.post(this.apiUrl+"updateEmployee", employee, this.options)
			.map((res:Response) => res.json());
	}

	//this method is used to delete a specific employee from the database
	//PARAMETERS: id : string representing the username for the emoloyee
	deleteEmployee(id:string) : Observable<Employee>{
		return this.http.delete(this.apiUrl+"deleteEmployee?username="+id, this.options)
			.map((res:Response) => res.json());
	}
}