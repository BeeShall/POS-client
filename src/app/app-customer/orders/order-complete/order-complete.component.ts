import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Order } from '../../../dataModels/order';
import { NgForm } from '@angular/forms';
import { CustomerService } from '../../../services/customer.service';

/*

OrderCompleteComponent

DESCRIPTION: This is a component class for the modal that displays after the payment has been complete
				This modal allows user to email a receipt and provide reviews for the food

AUTHOR: BISHAL REGMI

DATE: 2/28/2018

*/

@Component({
	selector: 'order-complete',
	templateUrl: 'order-complete.component.html'
})

export class OrderCompleteComponent implements OnInit {

	//used to show alert for email sent
	alertEmailed: boolean;

	//order id for the cusromer passed by reference
	@Input()
	orderId : string;
	
	constructor(public activeModal: NgbActiveModal,
	private customerService: CustomerService) { 
		this.alertEmailed = false
	}

	//this method adds the reviews to the specifc menu among the ones user ordered
	//PARAMETERS:
		//menuId: id of the menu being reviewd
		//rating: rating as integer for the menu
		//review: revies as string for the menu
	addReview(menuId, rating, review){

		//creating POST JSON data for the review
		let data = {
			menuId :menuId,
			review: {
				rating: rating,
				review: review
			}
		}

		//posting rhe review to the server
		this.customerService.addReview(data)
			.subscribe(data => {
				if(data["success"]){
					console.log("Successfully added review")
				}
				else{
					console.log(data["error"])
				}
			})

	}

	//this method is used to email a receript to the customer
	//PARAMETERS: email -> email address for the receipt to be mailed at
	emailReceipt(email){
		let data = {
			orderId: this.orderId,
			email:email
		}
		console.log(data)
		this.customerService.emailReceipt(data)
			.subscribe(data => {
				if(data["success"]){
					this.alertEmailed = true
					console.log("Successfully added review")
				}
				else{
					console.log(data["error"])
				}
			})
	}

	ngOnInit() { }
}