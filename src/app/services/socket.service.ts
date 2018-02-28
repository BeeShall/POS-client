import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import { HubConnection } from '@aspnet/signalr-client';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SocketService {

	public hubConnection = new HubConnection('http://localhost:5000/test');

	constructor(private http: Http) {

		this.hubConnection
			.start()
			.then(() => console.log('Connection started!'))
			.catch(err => console.log('Error while establishing connection :('));
			
			
	}
}