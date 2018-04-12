import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import * as io from 'socket.io-client'

/*

SocketService

DESCRIPTION: This is a service class for accessing all the websockets

	The return types of all the methods in the service are Observables

AUTHOR: BISHAL REGMI

DATE: 2/28/2018

*/

@Injectable()
export class SocketService {

	private socket: SocketIOClient.Socket


	constructor(private http: Http) {
		//URL to the socket application 
		this.socket = io("http://localhost:5000/")
	}

	//this method is used to notify servers that a customer joined
	//PARAMETERS: data : JSON containing information about whether the joned person is staff or not
	join(data) {
		this.socket.emit('join', data)
	}

	//this method is used to add an order to the database
	//PARAMETERS: data : JSON containing order information for the order
	addOrder(data) {
		this.socket.emit('addOrder', data)
	}

	//this method is used to closed an order
	closeOrder() {
		this.socket.emit('closeOrder')
	}

	//this method is used to cancel an order
	//PARAMETERS: data : JSON containing information about the order to cancel
	cancelOrder(data) {
		this.socket.emit('cancelOrder', data)
	}

	//this method is used to complete an order
	//PARAMETERS: orderNo: order id for the order to cancel
	completeOrder(orderNo) {
		this.socket.emit('completeOrder', orderNo)
	}

	//this method is a subscribing method for all the event emmitted by the server regarding any order updates
	//PARAMETER: event: event name for which subscribtion is needed
	getUpdatedOrder(event) {
		return new Observable<any>(observer => {
			this.socket.on(event, (data) => {
			  observer.next(data);    
			});
			return () => {
			  this.socket.disconnect();
			};  
		  })  
	}


	//this method is a subscribing method for any new order started by the customer i.e new customer
	//this is only listened by the waitress for a new order on a new table
	getNewOrder() {
		let observable = new Observable<any>(observer => {
			this.socket.on('newCustomer', (data) => {
			  observer.next(data);    
			});
			return () => {
			  this.socket.disconnect();
			};  
		  })     
		  return observable;
	}
}