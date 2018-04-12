import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Order } from '../../dataModels/order';
import { Menu } from '../../dataModels/menu';
import * as moment from 'moment';
import { CustomerService } from '../../services/customer.service';
import { OrderCompleteComponent } from "./order-complete/order-complete.component";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SocketService } from '../../services/socket.service';

/*

OrdersComponent

DESCRIPTION: This is a component class for the orders page in the customer section

AUTHOR: BISHAL REGMI

DATE: 2/28/2018

*/

@Component({
	selector: 'orders',
	templateUrl: 'orders.component.html'
})

export class OrdersComponent implements OnInit {

	//hold all the pending orders that haven't been sent to the database for the customer
	//passed by reference from app-customer 
	@Input()
	pendingOrders: Order[];

	//holds all the active/placed orders for the customer
	//passed by reference from app-customer
	@Input()
	activeOrders: Order[];

	//used to display the checkout section
	showCheckOut: boolean;

	//tax rate for the food
	taxRate = 7;

	//holds total cost of the order
	total: number;
	constructor(private customerService: CustomerService,
		private modalService: NgbModal,
		private socketService: SocketService) {
		this.showCheckOut = true;
	}

	ngOnInit() {
		//listening to the socket for real time updates about a new order
		this.socketService.getUpdatedOrder("Order Added")
			.subscribe(data => {
				console.log(data)
				if (data["success"]) {
					//adding the orders to the list
					this.activeOrders.push(...this.pendingOrders)
					this.pendingOrders.splice(0, this.pendingOrders.length);
				}
				else {
					console.log(data)
				}
			})
	}


	// this method adds all the pending orders to the list of active orders
	addToActive() {
		//post all the pendingOrders
		let orders = [];
		for (var i = 0; i < this.pendingOrders.length; i++) {
			let tempOrder = this.pendingOrders[i];
			//creating a standard order object such that to add to the database
			let order = {
				orderType: tempOrder.orderType,
				menuId: tempOrder.menu['_id']['$oid'],
				date: moment().toISOString(),
				quantity: tempOrder.quantity,
				size: tempOrder.size,
				status: "PLACED"
			}
			orders.push(order)
		}

		console.log(orders)

		//adding the order to the databse
		this.socketService.addOrder({"orders":orders})


		/*
		this.customerService.addOrders(orders)
			.subscribe(data => {
				if (data["success"]) {
					console.log("Successfully added order")
					this.activeOrders.push(...this.pendingOrders)

					this.pendingOrders.splice(0, this.pendingOrders.length);
				}
				else {
					console.log(data)
				}
			})
			*/
	}

	//this method is used to remove an order from the list of pending orders
	removeOrder(i) {
		console.log(this.pendingOrders[i]);
		this.pendingOrders.splice(i, 1);
	}

	//this method is used to calculate the total for all the orders
	getTotal(orders) {
		let total = 0;
		for (var i = 0; i < orders.length; i++) {
			total += orders[i].menu.prices[orders[i].size].price * orders[i].quantity
		}
		this.total = total;
		return total;
	}

	//this method is used to calculate the tax amount for the order
	getTax() {
		return this.total * this.taxRate / 100;
	}

	//stores the tip for the order
	tip: number = 0.0;

	//this method is used to calculate the tip amount for the order 
	//PARAMETERS: tipPercent -> the percent tip the customer decides
	getTip(tipPercent) {
		console.log(tipPercent)
		this.tip = tipPercent / 100 * (this.total + this.getTax());
	}

	//this method is used to get grand total including tax and tip for the order
	getGrandTotal() {
		return this.total + this.getTax() + this.tip;
	}

	//this method is used to close the order 
	closeOrder() {
		
		this.customerService.closeOrder()
			.subscribe(data => {
				if (data["success"]) {
					console.log("Order Successfully closed")
					this.showCheckOut = true;

				}
				else {
					console.log("Problems Closing the order")
				}
			})

	}

	//this method is used to make the payment and complete transaction
	completePayment() {

		//payment data to send to the server
		let paymentData = {
			tax: this.getTax(),
			tip: this.tip
		}

		//list of all the menu ids ordered by the customer to use later for asking reviews
		let orderedMenus = new Set();

		//list of all the menus ordered by the custome without repition
		let reviewMenus = [];
		for (let i = 0; i < this.activeOrders.length; i++) {
			if (!orderedMenus.has(this.activeOrders[i]['menuId'])) {
				orderedMenus.add(this.activeOrders[i]['menuId'])
				reviewMenus.push(this.activeOrders[i])
			}
		}



		//completing the payment
		this.customerService.completePayment(paymentData)
			.subscribe(data => {
				if (data["success"]) {
					console.log(reviewMenus)
					this.socketService.completeOrder(data["orderId"])

					//opening the reviews modal to ask the user for reviews and email reeipt
					const modalRef = this.modalService.open(OrderCompleteComponent, { size: "lg" });
					modalRef.componentInstance.activeOrders = reviewMenus;
					modalRef.componentInstance.orderId = data["orderId"]

				}
			})

	}


}