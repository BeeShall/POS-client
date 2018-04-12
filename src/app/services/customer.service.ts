import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*

CustomerService

DESCRIPTION: This is a service class for the APIs needed to be accessed by the customer

	The return types of all the methods in the service are Observables

AUTHOR: BISHAL REGMI

DATE: 2/28/2018

*/

@Injectable()
export class CustomerService {

	//base URL for the API call
	private apiUrl = "http://localhost:5000/api/";

	//headers for the HTTP call
	private headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
	private options = new RequestOptions({ headers: this.headers });

	constructor(private http: Http) { }

	//this method is used to add orders to the table/customer order
	//PARAMETERS: data -> array of all order objects
	addOrders(data): Observable<any> {
		return this.http.post(this.apiUrl + "addOrders", data, this.options)
			.map((res: Response) => res.json());
	}

	//this method is used to get all the orders from the server for the customer
	getAllOrders(): Observable<any> {
		return this.http.get(this.apiUrl+"getAllOrders",this.options)
			.map((res:Response) => res.json())
	}

	//this method is used to get all the active orders for the customer
	getAllActiveOrders(): Observable<any> {
		return this.http.get(this.apiUrl+"getAllActiveOrders",this.options)
			.map((res:Response) => res.json())
	}

	//this method is used to close the order for the customer
	closeOrder():Observable<any>{
		return this.http.get(this.apiUrl+"closeOrder",this.options)
			.map((res:Response) => res.json())
	}
	
	//this method is used to complete/billing for the customer
	//PARAMETERS: data -> JSON object containing billing details
	completePayment(data):Observable<any>{
		return this.http.post(this.apiUrl+"completeOrder", data,this.options)
			.map((res:Response) => res.json())
	}

	//this method is to add a review/rating to the menus customer has ordered
	//PARAMETERS: data -> JSON containing a review
	addReview(data):Observable<any>{
		return this.http.post(this.apiUrl+"addReview", data,this.options)
			.map((res:Response) => res.json())
	}

	//this method is used to email a receipt to the customer for their order
	//PARAMETERS: data-> JSON containing email address of the customer
	emailReceipt(data):Observable<any>{
		return this.http.post(this.apiUrl+"emailReceipt", data,this.options)
			.map((res:Response) => res.json())
	}

}