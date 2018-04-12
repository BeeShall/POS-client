import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Menu} from "../dataModels/menu";

/*

MeniService

DESCRIPTION: This is a service class for the all the APIs that needs to be accessed to operation related to menus

	The return types of all the methods in the service are Observables

AUTHOR: BISHAL REGMI

DATE: 2/28/2018

*/

@Injectable()
export class MenuService {

	//base URL for API
	private apiUrl = "http://localhost:5000/api/";

	//headers for the API call
	private headers = new Headers({'Content-Type':'application/json','Access-Control-Allow-Origin': '*'})
	private options = new RequestOptions({headers: this.headers});

	constructor(private http: Http) { }
	
	//This method is used to fetch all the menus from the database
	getAllMenu() : Observable<Menu>{
		return this.http.get(this.apiUrl+"getAllMenu", this.options)
			.map((res:Response) => res.json());
	}

	//this method is used to add a new menu to the database
	//PARAMETERS: menu: new menu to add of type Menu
	addMenu(menu:Menu) : Observable<Menu>{
		return this.http.post(this.apiUrl+"addMenu", menu, this.options)
			.map((res:Response) => res.json());
	}

	//this method is used to update a menu in the database
	//PARAMETERS: menu: menu to update with new details add of type Menu
	updateMenu(menu:Menu) : Observable<Menu>{
		return this.http.post(this.apiUrl+"updateMenu", menu, this.options)
			.map((res:Response) => res.json());
	}

	//this method is used to delete a menu from the databse
	//PARAMETERS: id: id of the menu to delete
	deleteMenu(id:string) : Observable<Menu>{
		return this.http.delete(this.apiUrl+"deleteMenu?menuId="+id, this.options)
			.map((res:Response) => res.json());
	}

	
}