import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Employee} from "../dataModels/employee";

@Injectable()
export class EmployeeService {

	private apiUrl = "http://localhost:5000/api/";
	private headers = new Headers({'Content-Type':'application/json','Access-Control-Allow-Origin': '*'})
	private options = new RequestOptions({headers: this.headers});

	constructor(private http: Http) { }
	
	getAllEmployees() : Observable<Employee>{
		return this.http.get(this.apiUrl+"getAllEmployees", this.options)
			.map((res:Response) => res.json());
	}

	addEmployee(employee:Employee) : Observable<Employee>{
		return this.http.post(this.apiUrl+"addEmployee", employee, this.options)
			.map((res:Response) => res.json());
	}

	updateEmployee(employee:Employee) : Observable<Employee>{
		return this.http.post(this.apiUrl+"updateEmployee", employee, this.options)
			.map((res:Response) => res.json());
	}

	deleteEmployee(id:string) : Observable<Employee>{
		return this.http.delete(this.apiUrl+"deleteEmployee?username="+id, this.options)
			.map((res:Response) => res.json());
	}
}