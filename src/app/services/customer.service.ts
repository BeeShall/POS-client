import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CustomerService {

	private apiUrl = "http://localhost:5000/api/";
	private headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
	private options = new RequestOptions({ headers: this.headers });

	constructor(private http: Http) { }

	addOrders(data): Observable<any> {
		return this.http.post(this.apiUrl + "addOrders", data, this.options)
			.map((res: Response) => res.json());
	}

	getAllOrders(): Observable<any> {
		return this.http.get(this.apiUrl+"getAllOrders",this.options)
			.map((res:Response) => res.json())
	}
}