import { Component, OnInit } from '@angular/core';
import { NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';
import { Order } from '../dataModels/order';
import { SocketService } from '../services/socket.service';
import { CustomerService } from '../services/customer.service';
import { MenuService } from '../services/menu.service';
import { Menu } from '../dataModels/menu';

@Component({
	selector: 'app-waitress',
	templateUrl: 'app-waitress.component.html',
	providers: [NgbTabsetConfig]
})

export class AppWaitressComponent implements OnInit {

	orders: any[] = [];
	menus = {};
	menuKeys: string[] = [];
	ordersByTable = [];

	constructor(config: NgbTabsetConfig,
		private socketService: SocketService,
		private customerService: CustomerService,
		private menuService: MenuService) {
		config.justify = 'center';
		config.type = 'pills';
	}

	ngOnInit() {
		this.menuService.getAllMenu()
			.subscribe(data => {
				if (data["success"]) {
					this.sortMenus(data["menus"]);
				}
				else {
					console.log("Error fetching menus!")
				}
			})

		this.socketService.hubConnection.on('test', receivedMessage => {
			console.log(receivedMessage)
			return receivedMessage;
		});
	}

	sortMenus(menus) {


		for (let menu of menus) {
			this.menus[menu.menuId] = menu;
			this.menuKeys.push(menu.menuId);
		}


		this.customerService.getAllActiveOrders()
			.subscribe(data => {
				if (data["success"]) {

					let orders = data["orders"];

					console.log(orders)

					for (var i = 0; i < orders.length; i++) {
						let ordersArray = [];

						let tableOrders = orders[i].orders;
						console.log("tableOrders", tableOrders)
						for (let j = 0; j < tableOrders.length; j++) {
							tableOrders[j].menu = this.menus[tableOrders[j].menuId];
							ordersArray.push(tableOrders[j]);
							this.orders.push({
								orderNo: orders[i].orderNo,
								tableNo: orders[i].tableNo,
								quantity: tableOrders[j].quantity,
								size: tableOrders[j].menu.prices[tableOrders[j].size].type,
								server: orders[i].server,
								menu: tableOrders[j].menu
							});
						}
						console.log("ordersArray", ordersArray)
						this.ordersByTable.push({
							orderNo: orders[i].orderNo,
							tableNo: orders[i].tableNo,
							orders: ordersArray
						});
					}

					console.log(this.ordersByTable)
				}
				else {
					console.log("Error fetching orders!")
				}
			})
		//sort the menus based on their menuSection
	}

	viewOrder(orderId) {
		//const modalRef = this.modalService.open(ViewDetailsComponent, { size: "lg" });
		//modalRef.componentInstance.menu = menu;
	}

	closeOrder(orderId) {

	}

	addOrder(order) {

		this.socketService.hubConnection
			.invoke('test', "Testing 1 2 3!")
			.catch(err => console.error(err));

		//use autoCompletes for this
	}

	viewOrdersForTable() {

	}


}