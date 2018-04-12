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

/*

AppWaitressComponent

DESCRIPTION: This is a component class for the waitress portal

AUTHOR: BISHAL REGMI

DATE: 2/28/2018

*/

@Component({
	selector: 'app-waitress',
	templateUrl: 'app-waitress.component.html',
	providers: [NgbTabsetConfig]
})

export class AppWaitressComponent implements OnInit {

	//list to hold all the orders for the list view
	orders: any[] = [];

	//object to hold all the menus keyed by their ids
	menus = {};

	//list of all the menu keys
	menuKeys: string[] = [];

	//list of all the orders based on their table for thr order by table view
	ordersByTable = [];

	//list of all the reservations
	reservations = [];

	//name of the server passed by reference
	@Input()
	server: string = "";


	constructor(config: NgbTabsetConfig,
		private socketService: SocketService,
		private waitressService: WaitressService,
		private menuService: MenuService,
		private modalService: NgbModal) {

		//config for the tabs setting 
		config.justify = 'center';
		config.type = 'pills';

		//setting the default server for testing purpopses
	
		this.server = "BISHAL"
	}

	ngOnInit() {

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

		//fetching all the reservations from the database
		this.waitressService.getReservations()
			.subscribe(data => {
				if (data["success"]) {
					this.reservations = data["reservations"]
					console.log(this.reservations)

					//initializing the alerts
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

			//notifying the websocket to start a connection
			this.socketService.join({
				"staff":true
			})

			//listeing to the websocket for all the new orders
			this.socketService.getNewOrder().subscribe(data=>{
				data = JSON.parse(data)
				this.ordersByTable.push({
					orderNo: data['orderNo'],
					tableNo: data['tableNo'],
					orderId: data['_id']['$oid'],
					orders: []
				});
			})


			//listening to the websockets for all the completed order notifications
			this.socketService.getUpdatedOrder("Completed Order")
			.subscribe(data => {
				let index = 0;
				for(let i =0; i<this.ordersByTable.length; i++){
					if(this.ordersByTable[i].orderId == data["orderNo"]){
						index = i;
						break;
					}
				}
				
				//deleting the orders form the list of orders
				this.ordersByTable.splice(index, 1);



				for(let i=0; i<this.orders.length; i++){
					if(this.orders[i].orderId == data["orderNo"]){
						this.orders.splice(i,1)
						i--;
					}
				}
				
			})
			
			//listening to the websocket for all the added order notifications
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

	//this method is used to set alert for the next reservation
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

	//this method is used to get the next earliest reservation
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


	//this method sorts the menu list fetched from the database such that
		//1. They are easy to iterate thought HTML
		//2. keyed on ids so that they are easy to refer later
	//PARAMETERS: menus -> list of all the menus fetched from the database
	sortMenus(menus) {

		for (let menu of menus) {
			this.menus[menu['_id']['$oid']] = menu;
			this.menuKeys.push(menu['_id']['$oid']);
		}


		//getting all the orders that are in processing from the database
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

						//adding the orders to the list view
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

						//adding the orders to the orders by table
						//data structure has been customized to make ot easy for iterating through HTML
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

	//this method is used to cancel an order
	//PARAMETERS:
		//tableIndex: the index of the order in orders by table
		//orderIndex: the index of the order in the orders list view
	cancelOrder(tableIndex, OrderIndex) {

		//canceling the order from the databse
		this.waitressService.cancelOrder({ orderId: this.ordersByTable[tableIndex].orderId, cancelId: this.ordersByTable[tableIndex].orders[OrderIndex].date })
			.subscribe(data => {
				if (data["success"]) {
					let orderMenu = this.ordersByTable[tableIndex].orders[OrderIndex].menu;
					let orderNo = this.ordersByTable[tableIndex].orderNo;

					//removing the orders locally
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

	//this method is used to close the order
	//PARAMETERS:
		//orderId: id of the order to delete
		//orders: the order to close
	closeOrder(orderId, orders) {

		console.log("orderId", orderId)
		this.waitressService.closeOrder(orderId)
			.subscribe(data => {
				if (data["success"]) {
					console.log("Order Successfully closed")
					//remove from ordersByTable

					let total = 0

					//calculate the total of all orders
					for (let i = 0; i < orders.length; i++) {
						let price = orders[i].menu.prices[orders[i].size].price
						total += orders[i].quantity * price
					}

					//open a model for completing the payment
					const modalRef = this.modalService.open(CloseOrderComponent);
					modalRef.componentInstance.orderId = orderId;
					modalRef.componentInstance.total = total


					//remove the order lcoally
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

				}
				else {
					console.log("Problems Closing the order")
				}
			})

	}

	//this method is to add an order for the specific table
	//PARAMETERS: tableInde: index for the orders by table array
	addOrder(tableIndex) {

		//open the addo order modal component
		const modalRef = this.modalService.open(AddOrderComponent);
		modalRef.componentInstance.data = {
			menus: Object.values(this.menus),
			server: this.server,
			tableIndex: tableIndex,
			orders: this.orders,
			ordersByTable: this.ordersByTable
		}
	}

	//this method is a utility function to format the time to a readable format
	formatDateTime(date): string {

		return moment(date).format('MM/DD/YYYY hh:mm A');
	}

}