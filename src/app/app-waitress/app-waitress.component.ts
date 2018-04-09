import { Component, OnInit, Input } from '@angular/core';
import { NgbTabsetConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Order } from '../dataModels/order';
import { SocketService } from '../services/socket.service';
import { MenuService } from '../services/menu.service';
import { Menu } from '../dataModels/menu';
import { AddOrderComponent } from './add-order/add-order.component';
import { WaitressService } from '../services/waitress.service';
import { CloseOrderComponent } from './add-order/close-order/close-order.component';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable'

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
	reservations = [];

	@Input()
	server: string = "";


	constructor(config: NgbTabsetConfig,
		private socketService: SocketService,
		private waitressService: WaitressService,
		private menuService: MenuService,
		private modalService: NgbModal) {
		config.justify = 'center';
		config.type = 'pills';
		this.server = "BISHAL"
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

		this.waitressService.getReservations()
			.subscribe(data => {
				if (data["success"]) {
					this.reservations = data["reservations"]
					console.log(this.reservations)
					if(this.reservations.length > 0){
					this.setAlertForReminder()
					}
				}
				else {
					console.log("Database error in the server")
				}
			}, err => {
				console.log("Error while fetching reservations!")
			})

			this.socketService.join({
				"staff":true
			})

			this.socketService.getNewOrder().subscribe(data=>{
				data = JSON.parse(data)
				this.ordersByTable.push({
					orderNo: data['orderNo'],
					tableNo: data['tableNo'],
					orderId: data['_id']['$oid'],
					orders: []
				});
			})



			this.socketService.getUpdatedOrder("Completed Order")
			.subscribe(data => {
				let index = 0;
				for(let i =0; i<this.ordersByTable.length; i++){
					if(this.ordersByTable[i].orderId == data["orderNo"]){
						index = i;
						break;
					}
				}

				this.ordersByTable.splice(index, 1);



				for(let i=0; i<this.orders.length; i++){
					if(this.orders[i].orderId == data["orderNo"]){
						this.orders.splice(i,1)
						i--;
					}
				}
				
			})

			this.socketService.getUpdatedOrder("Order Added")
			.subscribe(data => {
				if (data["success"]) {
					//find the orders
					let tempOrders = data["data"]["orders"]
					let ordersIndex = 0;
					let index = 0

					//find the index for ordersByTableList
					for(let i =0; i<this.ordersByTable.length; i++){
						if(this.ordersByTable[i].orderId == data["data"]["orderNo"]){
							index = i;
							break;
						}
					}

					//find the respective menus for each order
					for(let i =0; i<tempOrders.length; i++){
						tempOrders[i]["menu"]=this.menus[tempOrders[i]["menuId"]]
						this.orders.push({
							orderNo: this.ordersByTable[index].orderNo,
							orderId:  this.ordersByTable[index].orderId,
							tableNo:  this.ordersByTable[index].tableNo,
							quantity: tempOrders[i].quantity,
							size: tempOrders[i].menu.prices[tempOrders[i].size].type,
							server: tempOrders[i].server,
							menu: tempOrders[i].menu
						});
					}

					this.ordersByTable[index].orders.push(...tempOrders)
				}
				else {
					console.log(data)
				}
			}
			
		)
	}

	setAlertForReminder() {


		//get the earliest reservation
		let earliestReservationIndex = this.getEarliestReservationIndex()

		let resTime = moment(this.reservations[earliestReservationIndex]['date'])

		setTimeout(()=>{
			this.reservations.splice(earliestReservationIndex,1)
		}, resTime.diff(moment.now()))

		//calculate the timeout
		//setting alert for 30 minutes before the reservations
		let alertTime = resTime.subtract(30, "minutes");

		let timeOut = alertTime.diff(moment.now())

		//calculate the timeout to delete it
		setTimeout(()=>{

			//what if the reservations are very close? work on that
			alert("Reservation at "+resTime.format('MM/DD/YYYY hh:mm A')+"for "+this.reservations[earliestReservationIndex]['people']+" people!")
			this.setAlertForReminder()
		}, alertTime)
	}

	popAlert(time) {

	}

	getEarliestReservationIndex() {

		//get all the reservation within the next 30 mins
		//reservations alerts come every 30 mins
		let earliestReservation = moment(this.reservations[0]['date'])
		let earlyIndex = 0;
		for (let i = 0; i < this.reservations.length; i++) {
			let tempDate = moment(this.reservations[i]['date'])
			if (tempDate.isBefore(earliestReservation)) {
				earliestReservation = tempDate
				earlyIndex = i;
			}
		}

		return earlyIndex

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

	closeOrder(orderId, orders) {

		console.log("orderId", orderId)
		this.waitressService.closeOrder(orderId)
			.subscribe(data => {
				if (data["success"]) {
					console.log("Order Successfully closed")
					//remove from ordersByTable

					let total = 0

					for (let i = 0; i < orders.length; i++) {
						let price = orders[i].menu.prices[orders[i].size].price
						total += orders[i].quantity * price
					}

					const modalRef = this.modalService.open(CloseOrderComponent);
					modalRef.componentInstance.orderId = orderId;
					modalRef.componentInstance.total = total



					for (let i = 0; i < this.ordersByTable.length; i++) {
						if (this.ordersByTable[i].orderId == orderId) {

							this.ordersByTable.splice(i, 1);
						}
					}

					for(let i=0; i<this.orders.length; i++){
						if(this.orders[i].orderId == orderId){
							this.orders.splice(i,1)
							i--;
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
			orders: this.orders,
			ordersByTable: this.ordersByTable
		}
	}

	formatDateTime(date): string {

		return moment(date).format('MM/DD/YYYY hh:mm A');
	}

}