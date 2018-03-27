import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Order } from '../../../dataModels/order';
import { NgForm } from '@angular/forms';
import { CustomerService } from '../../../services/customer.service';

@Component({
	selector: 'order-complete',
	templateUrl: 'order-complete.component.html'
})

export class OrderCompleteComponent implements OnInit {

	alertEmailed: boolean;

	@Input()
	activeOrders: Order[];

	@Input()
	orderId : string;
	
	constructor(public activeModal: NgbActiveModal,
	private customerService: CustomerService) { 
		this.alertEmailed = false
	}

	addReview(menuId, rating, review){
		let data = {
			menuId :menuId,
			review: {
				rating: rating,
				review: review
			}
		}

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