import { Component, OnInit } from '@angular/core';
import { NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';
import { Menu, MenuType } from '../dataModels/menu';
import { Order } from '../dataModels/order';
import { MenuService } from '../services/menu.service';
import { CustomerService } from '../services/customer.service';

@Component({
	selector: 'app-customer',
	templateUrl: 'app-customer.component.html',
	providers: [NgbTabsetConfig]
})

export class AppCustomerComponent implements OnInit {

	dispMenu: {};

	pendingOrders: Order[];

	activeOrders: Order[];

	constructor(config: NgbTabsetConfig,
		private menuService: MenuService,
		private customerService: CustomerService) {
		config.justify = 'center';
		config.type = 'pills';

		this.pendingOrders = []
		this.activeOrders = [];

		this.menuService.getAllMenu()
			.subscribe(data => {
				if (data["success"]) {
					this.sortMenus(data["menus"]);
				}
				else {
					console.log("Error fetching menus!")
				}
			})
	}

	sortMenus(menus) {
		this.dispMenu = {};
		for (let type of MenuType) {
			this.dispMenu[type] = [];
		}

		let idMenu = {};

		for (let menu of menus) {
			idMenu[menu.menuId] = menu;
			this.dispMenu[menu.menutype].push(menu);
		}


		this.customerService.getAllOrders()
			.subscribe(data => {
				if (data["success"]) {

					let orders = data["orders"];
					console.log(data)

					console.log("Orders", orders);
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