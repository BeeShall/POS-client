import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { WaitressService } from '../../../services/waitress.service';

@Component({
	selector: 'close-order',
	templateUrl: 'close-order.component.html'
})

export class CloseOrderComponent implements OnInit {

	@Input()
	orderId: string

	@Input()
	total: number

	showCheckOut: boolean;
	alertEmailed: boolean
	tipAdded: boolean

	constructor(public activeModal: NgbActiveModal,
		private waitressService: WaitressService) {
		this.showCheckOut = true;
		this.alertEmailed = false;
		this.tipAdded = false;
	}

	completePayment() {
		let paymentData = {
			tax: 0.14 * this.total,
		}
		this.waitressService.completePayment(paymentData)
			.subscribe(data => {
				if (data["success"]) {
					this.showCheckOut = false
				}
				else{
					console.log(data["err"])
				}
			})
	}

	emailReceipt(email) {

		let data = {
			orderId: this.orderId,
			email: email
		}
		console.log(data)
		this.waitressService.emailReceipt(data)
			.subscribe(data => {
				if (data["success"]) {
					this.alertEmailed = true;
					console.log("Successfully added review")
				}
				else {
					console.log(data["error"])
				}
			})

	}

	addTip(tip){
		let data ={
			orderId: this.orderId,
			tip : tip
		}

		console.log(data)
		this.waitressService.addTip(data)
			.subscribe(data => {
				if (data["success"]) {
					this.tipAdded = true;
					console.log("Successfully added tip")
				}
				else {
					console.log(data["error"])
				}
			})
	}

	ngOnInit() { }
}