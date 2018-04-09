import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import * as io from 'socket.io-client'

@Injectable()
export class SocketService {

	private socket: SocketIOClient.Socket


	constructor(private http: Http) {
		this.socket = io("http://localhost:5000/")
	}

	join(data) {
		this.socket.emit('join', data)
	}

	addOrder(data) {
		this.socket.emit('addOrder', data)
	}

	closeOrder() {
		this.socket.emit('closeOrder')
	}

	cancelOrder(data) {
		this.socket.emit('cancelOrder', data)
	}

	completeOrder(orderNo) {
		this.socket.emit('completeOrder', orderNo)
	}

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