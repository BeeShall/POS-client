import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AppService {

	private apiUrl = "http://localhost:5000/api/";
	private headers = new Headers({'Content-Type':'application/json','Access-Control-Allow-Origin': '*'})
	private options = new RequestOptions({headers: this.headers});

	constructor(private http: Http) { }
	
	login(data) : Observable<any>{
		return this.http.post(this.apiUrl+"login", data, this.options)
			.map((res:Response) => res.json());
	}
}