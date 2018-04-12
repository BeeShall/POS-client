import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { WaitressService } from '../../../services/waitress.service';

/*
CloseOrderComponent

DESCRIPTION: This is a component class for the closing an order from waitress portal

AUTHOR: BISHAL REGMI

DATE: 2/28/2018

*/
@Component({
	selector: 'close-order',
	templateUrl: 'close-order.component.html'
})

export class CloseOrderComponent implements OnInit {

	//orderID passed by reference to close
	@Input()
	orderId: string

	//grand total of the bill
	@Input()
	total: number

	//to show the checkout section
	showCheckOut: boolean;

	//to show the alert when receipt was emailed
	alertEmailed: boolean

	//to show the alert when adding tip was successful
	tipAdded: boolean

	constructor(public activeModal: NgbActiveModal,
		private waitressService: WaitressService) {
		this.showCheckOut = true;
		this.alertEmailed = false;
		this.tipAdded = false;
	}

	//this method is used to make the payment bill
	completePayment() {

		//data structure to post to he databse
		let paymentData = {
			orderNo: this.orderId,
			tax: 0.14 * this.total,
			tip: 0
		}

		
		this.waitressService.completePayment(paymentData)
			.subscribe(data => {
				if (data["success"]) {
					//if the payment is completed, hide the checkout screen
					this.showCheckOut = false
				}
				else{
					console.log(data["err"])
				}
			})
	}

	//this method is used to send an email of receipt to the customer
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

	//this method is ised to add a tip for the order
	//PARAMETERS:
		//tip: tip amount to be added as number
	addTip(tip){

		//data structure to post the tip data
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