import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Menu} from "../dataModels/menu";

@Injectable()
export class MenuService {

	private apiUrl = "http://localhost:5000/api/";
	private headers = new Headers({'Content-Type':'application/json','Access-Control-Allow-Origin': '*'})
	private options = new RequestOptions({headers: this.headers});

	constructor(private http: Http) { }
	
	getAllMenu() : Observable<Menu>{
		return this.http.get(this.apiUrl+"getAllMenu", this.options)
			.map((res:Response) => res.json());
	}

	addMenu(menu:Menu) : Observable<Menu>{
		return this.http.post(this.apiUrl+"addMenu", menu, this.options)
			.map((res:Response) => res.json());
	}
}