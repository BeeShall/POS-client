import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*

WaitressService

DESCRIPTION: This is a service class for the waitress portal for any order operationt to be performed by the waitresses

	The return types of all the methods in the service are Observables

AUTHOR: BISHAL REGMI

DATE: 2/28/2018

*/

@Injectable()
export class WaitressService {

	//base URL
	private apiUrl = "http://localhost:5000/api/";

	//API headers
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
	//PARAMETERS: orderID-> order id for the order to be closed
	closeOrder(orderId):Observable<any>{
		console.log(orderId)
		return this.http.get(this.apiUrl+"closeOrder?orderNo="+ orderId,this.options)
			.map((res:Response) => res.json())
	}

	//this method is used to cancel a specific order from a table
	//PARAMETERS: data-> JSON containing the details for the order to be canceled
	cancelOrder(data):Observable<any>{
		console.log(JSON.stringify(data))
		return this.http.post(this.apiUrl+"cancelOrder", JSON.stringify(data), this.options)
			.map((res:Response) => res.json())
	}

	//this method is used to email a receipt to the customer for their order
	//PARAMETERS: data-> JSON containing email address of the customer
	emailReceipt(data):Observable<any>{
		return this.http.post(this.apiUrl+"emailReceipt", data,this.options)
			.map((res:Response) => res.json())
	}

	//this method is used to complete/billing for the customer
	//PARAMETERS: data -> JSON object containing billing details
	completePayment(data):Observable<any>{
		return this.http.post(this.apiUrl+"completeOrder", data,this.options)
			.map((res:Response) => res.json())
	}

	//this method is used to add a tip to the order after the payment has been complete
	//PARAMETERS: data -> JSON object containing tip data and orderId
	addTip(data):Observable<any>{
		return this.http.post(this.apiUrl+"addTip", data,this.options)
			.map((res:Response) => res.json())
	}

	//this method is used to get all upcoming reservations
	getReservations(): Observable<any> {
		return this.http.get(this.apiUrl+"getReservations",this.options)
			.map((res:Response) => res.json())
	}
}