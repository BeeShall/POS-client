import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Menu, MenuType } from '../../dataModels/menu';
import { CustomerService } from '../../services/customer.service';
import * as moment from 'moment';
import { SocketService } from '../../services/socket.service';

@Component({
	selector: 'add-order',
	templateUrl: 'add-order.component.html'
})

export class AddOrderComponent implements OnInit {

	@Input()
	data: any;

	numbers = [];


	public searchString: string;

	constructor(public activeModal: NgbActiveModal,
		private customerService: CustomerService,
		private socketService: SocketService) {
		this.numbers = Array(5).fill(0).map((x, i) => i + 1);
	}


	ngOnInit() {
	 }

	addOrder(menuIndex, quantity, size) {

		let order = {
			orderType: "WAITRESS",
			menuId: this.data.menus[menuIndex]['_id']['$oid'],
			date: moment().toISOString(),
			quantity: quantity,
			size: size ? size : 0,
			status: "PLACED"
		}

		let orderNo = this.data["ordersByTable"][this.data["tableIndex"]]["orderId"]

		this.socketService.addOrder({"orderNo": orderNo, "orders":[order]})

		/*
		this.customerService.addOrders([order])
			.subscribe(data => {
				if (data["success"]) {
					console.log("Successfully added order")

					console.log(order)
					console.log(this.data)

					this.data.orders.push({
						orderNo: this.data.ordersByTable[this.data.tableIndex].orderNo,
						tableNo: this.data.ordersByTable[this.data.tableIndex].tableNo,
						quantity: quantity,
						size: size ? MenuType[size] : "REGULAR",
						server: this.data.server,
						menu: this.data.menus[menuIndex]
					});

					order["menu"] = this.data.menus[menuIndex]

					this.data.ordersByTable[this.data.tableIndex].orders.push(order);

					//websocket call
				}
				else {
					console.log(data)
				}
			})
			*/

	}

}