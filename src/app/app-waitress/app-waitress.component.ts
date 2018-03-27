import { Component, OnInit, Input } from '@angular/core';
import { NgbTabsetConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Order } from '../dataModels/order';
import { SocketService } from '../services/socket.service';
import { MenuService } from '../services/menu.service';
import { Menu } from '../dataModels/menu';
import { AddOrderComponent } from './add-order/add-order.component';
import { WaitressService } from '../services/waitress.service';

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

	@Input()
	server: string = "";


	constructor(config: NgbTabsetConfig,
		private socketService: SocketService,
		private waitressService: WaitressService,
		private menuService: MenuService,
		private modalService: NgbModal) {
		config.justify = 'center';
		config.type = 'pills';
		this.server ="BISHAL"
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
			this.menus[menu['_id']['$oid']] = menu;
			this.menuKeys.push(menu['_id']['$oid']);
		}


		this.waitressService.getAllActiveOrders()
			.subscribe(data => {
				if (data["success"]) {

					let tempOrders = data["orders"];

					console.log(tempOrders)
					console.log(menus)

					for (var i = 0; i < tempOrders.length; i++) {
						let ordersArray = [];

						let tableOrders = tempOrders[i].orders;
						console.log(tableOrders)
						for (let j = 0; j < tableOrders.length; j++) {
							tableOrders[j].menu = this.menus[tableOrders[j].menuId];
							ordersArray.push(tableOrders[j]);
							this.orders.push({
								orderNo: tempOrders[i].orderNo,
								orderId: tempOrders[i]['_id']['$oid'],
								tableNo: tempOrders[i].tableNo,
								quantity: tableOrders[j].quantity,
								size: tableOrders[j].menu.prices[tableOrders[j].size].type,
								server: tempOrders[i].server,
								menu: tableOrders[j].menu
							});
						}
						this.ordersByTable.push({
							orderNo: tempOrders[i].orderNo,
							tableNo: tempOrders[i].tableNo,
							orderId: tempOrders[i]['_id']['$oid'],
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

	cancelOrder(tableIndex, OrderIndex) {
		this.waitressService.cancelOrder({ orderId: this.ordersByTable[tableIndex].orderId, cancelId: this.ordersByTable[tableIndex].orders[OrderIndex].date })
			.subscribe(data => {
				if (data["success"]) {
					let orderMenu = this.ordersByTable[tableIndex].orders[OrderIndex].menu;
					let orderNo = this.ordersByTable[tableIndex].orderNo;

					for (let i = 0; i < this.orders.length; i++) {
						if (this.orders[i].orderNo == orderNo && this.orders[i].menu == orderMenu) {
							this.orders.splice(i, 1)
							break;
						}
					}

					this.ordersByTable[tableIndex].orders.splice(OrderIndex, 1);
					console.log("Order Successfully canceled")

					//websocket call

				}
				else {
					console.log("Problems Canceling the order")
				}
			})
	}

	closeOrder(orderId) {

		console.log("orderId", orderId)
		this.waitressService.closeOrder(orderId)
			.subscribe(data => {
				if (data["success"]) {
					console.log("Order Successfully closed")
					//remove from ordersByTable
					for(let i =0; i<this.ordersByTable.length; i++){
						if(this.ordersByTable[i].orderNo == orderId){
							this.ordersByTable.splice(i, 1);
						}
					}
					//websocket call
		
				}
				else {
					console.log("Problems Closing the order")
				}
			})

	}

	addOrder(tableIndex) {

		const modalRef = this.modalService.open(AddOrderComponent);
		modalRef.componentInstance.data = {
			menus: Object.values(this.menus),
			server: this.server,
			tableIndex: tableIndex,
			orders : this.orders,
			ordersByTable : this.ordersByTable
		}


	}

}