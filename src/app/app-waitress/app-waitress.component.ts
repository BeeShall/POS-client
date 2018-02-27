import { Component, OnInit } from '@angular/core';
import { NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';
import { Order } from '../dataModels/order';

@Component({
	selector: 'app-waitress',
	templateUrl: 'app-waitress.component.html',
	providers: [NgbTabsetConfig]
})

export class AppWaitressComponent implements OnInit {

	orders:Order[];
	ordersByTable: {}

	constructor(config: NgbTabsetConfig) {
		config.justify = 'center';
		config.type = 'pills';
		
		
	}

	ngOnInit() { }

	viewOrder(orderId) {
		//const modalRef = this.modalService.open(ViewDetailsComponent, { size: "lg" });
		//modalRef.componentInstance.menu = menu;
	}

	closeOrder(orderId){

	}

	addOrder(order){
		//use autoCompletes for this
	}

	viewOrdersForTable(){

	}


}