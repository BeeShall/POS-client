import { Component, OnInit } from '@angular/core';
import { NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';
import { Menu, MenuType } from '../dataModels/menu';
import { Order } from '../dataModels/order';
import { MenuService } from '../services/menu.service';
import { CustomerService } from '../services/customer.service';
import { SocketService } from '../services/socket.service';

/*

MenuComponent

DESCRIPTION: This is a component class for the customer page of the application

AUTHOR: BISHAL REGMI

DATE: 2/28/2018

*/

@Component({
	selector: 'app-customer',
	templateUrl: 'app-customer.component.html',
	providers: [NgbTabsetConfig]
})

export class AppCustomerComponent implements OnInit {

	//object to hold the menu based on their types i.e. entrees, appetizers, etc
	dispMenu: {};

	//orders in the cart that haven't been placed yet
	pendingOrders: Order[];

	//orders that have already been placed
	activeOrders: Order[];

	

	constructor(config: NgbTabsetConfig,
		private menuService: MenuService,
		private customerService: CustomerService,
		private socketService:SocketService) {
		
		//configs for the tabs
		config.justify = 'center';
		config.type = 'pills';

		//initialization of the orders
		this.pendingOrders = []
		this.activeOrders = [];

		//fetching all the menus from the database
		this.menuService.getAllMenu()
			.subscribe(data => {
				if (data["success"]) {
					this.sortMenus(data["menus"]);
				}
				else {
					console.log("Error fetching menus!")
				}
			})

		//indicating the server that a customer has joined and
		// opening a websocket connection for real time updates
		this.socketService.join({
			"staff": false,
		})
	}

	//this method sorts the menu list fetched from the database such that
		//1. They are easy to iterate thought HTML
		//2. keyed on ids so that they are easy to refer later
	//PARAMETERS: menus -> list of all the menus fetched from the database
	sortMenus(menus) {
		this.dispMenu = {};

		//initializing the object will all the menusections
		for (let type of MenuType) {
			this.dispMenu[type] = [];
		}

		//map to store menu keyed with their id
		let idMenu = {};

		//sorting the menus into idMenu and dispMenu
		for (let menu of menus) {
			idMenu[menu["_id"]["$oid"]] = menu;
			this.dispMenu[menu.menutype].push(menu);
		}

		//fetching all the orders for the customer from the database
		//this is for when the customer is accessing the page agian after the order has already been started
		this.customerService.getAllOrders()
			.subscribe(data => {
				if (data["success"]) {

					let orders = data["orders"];
					console.log(data)

					console.log("Orders", orders);
					//adding the menu details to each order, so that its easy to fetch the menu details for calculations and display
					//adding the orders to the list of active orders
					for(var i=0; i<orders.length; i++){
						orders[i].menu = idMenu[orders[i].menuId];
						this.activeOrders.push(orders[i]);
					}

					console.log("ActiveOrders", this.activeOrders);

				}
				else {
					console.log("Error fetching orders!")
				}
			})




		console.log("Display Menu", this.dispMenu)
		//sort the menus based on their menuSection
	}

	ngOnInit() { }

}