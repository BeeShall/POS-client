import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Order } from '../../dataModels/order';
import { Menu } from '../../dataModels/menu';
import * as moment from 'moment';
import { CustomerService } from '../../services/customer.service';

@Component({
	selector: 'orders',
	templateUrl: 'orders.component.html'
})

export class OrdersComponent implements OnInit {

	@Input()
	pendingOrders: Order[];

	@Input()
	activeOrders: Order[];

	showCheckOut: boolean;

	constructor(private customerService: CustomerService) {
		this.showCheckOut = false;
	}

	addToActive() {
		//post all the pendingOrders
		let orders = [];
		for (var i = 0; i < this.pendingOrders.length; i++) {
			let tempOrder = this.pendingOrders[i];
			let order = {
				orderType: tempOrder.orderType,
				menuId: tempOrder.menu.menuId,
				date: moment().toISOString(),
				quantity: tempOrder.quantity,
				size: tempOrder.size,
				status: "PLACED"
			}
			orders.push(order)
		}

		console.log(orders)

		this.customerService.addOrders(orders)
			.subscribe(data => {
				if (data["success"]) {
					console.log("Successfully added order")
					this.activeOrders.push(...this.pendingOrders)

					this.pendingOrders.splice(0, this.pendingOrders.length);
				}
				else{
					console.log(data)
				}
			})
	}

	removeOrder(i) {
		console.log(this.pendingOrders[i]);
		this.pendingOrders.splice(i, 1);
	}

	finish() {
		this.showCheckOut = true;
	}

	getTotal(orders) {
		let total = 0;
		for (var i = 0; i < orders.length; i++) {
			total += orders[i].menu.prices[orders[i].size].price * orders[i].quantity
		}
		return total;
	}

	ngOnInit() { }
}