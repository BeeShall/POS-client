import { Component, OnInit, Input } from '@angular/core';
import { Menu, MenuType } from '../../dataModels/menu';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap'
import { Order } from '../../dataModels/order'
import { ViewDetailsComponent } from './view-details/view-details.component';

@Component({
	selector: 'display-menu',
	templateUrl: 'display-menu.component.html',
})

export class DisplayMenuComponent implements OnInit {

	sections = MenuType;

	@Input()
	dispMenu;

	numbers = [];

	@Input()
	pendingOrders: Order[];


	constructor(private modalService: NgbModal) {

		this.numbers = Array(5).fill(0).map((x, i) => i + 1);
	}

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

	openDetails(menu) {
		const modalRef = this.modalService.open(ViewDetailsComponent, { size: "lg" });
		modalRef.componentInstance.menu = menu;
	}

	ngOnInit() { }
}