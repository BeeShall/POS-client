import { Component, OnInit, Input } from '@angular/core';
import { Menu, MenuType } from '../../dataModels/menu';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap'
import { Order } from '../../dataModels/order'
import { ViewDetailsComponent } from './view-details/view-details.component';

/*

DisplayMenuComponent

DESCRIPTION: This is a component class for the menu page in the customer section

AUTHOR: BISHAL REGMI

DATE: 2/28/2018

*/

@Component({
	selector: 'display-menu',
	templateUrl: 'display-menu.component.html',
	styleUrls: ['display-menu.component.css']
})

export class DisplayMenuComponent implements OnInit {

	//all the different menu type available i.e. entree, appetizers etc
	sections = MenuType;

	//object to hold the menu based on their types i.e. entrees, appetizers, etc
	//passed by reference from app-customer component
	@Input()
	dispMenu;

	//array holding template numbers for quantity field
	numbers = [];

	//array holding all the pending orders passed by refernce from app-custoemer
	@Input()
	pendingOrders: Order[];


	constructor(private modalService: NgbModal) {

		//initialzing the qauntity array
		this.numbers = Array(5).fill(0).map((x, i) => i + 1);
	}

	//this method is used to add an order to the list of pending orders for the component
	//PARAMETERS:
		//menu : menu being added to order
		//quantity: quantity of menu being ordered
		//priceIndex: indicates the index of menu size selected to fetch the price
	addToOrders(menu, quantity, priceIndex) {
		for (var i = 0; i < this.pendingOrders.length; i++) {
			if (this.pendingOrders[i].menu.menuId == menu.menuId) {
				
				this.pendingOrders[i]["quantity"] += parseInt(quantity);
				return;
			}
		}

		console.log(priceIndex);

		this.pendingOrders.push({
			"menu": menu,
			"orderType": "SELF",
			"quantity": parseInt(quantity),
			"size": (priceIndex) ? parseInt(priceIndex):0

		});
		console.log(this.pendingOrders)
	}

	//this method is used to view the modal for detailed menu including nutritional info, pictures and review for a specific menu
	//PARAMETERS: menu -> menu to view the details for
	openDetails(menu) {
		const modalRef = this.modalService.open(ViewDetailsComponent, { size: "lg" });
		modalRef.componentInstance.menu = menu;
	}

	ngOnInit() { }
}