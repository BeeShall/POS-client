import { Component, OnInit } from '@angular/core';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {Menu} from '../../dataModels/menu'
import {AddMenuComponent} from './add-menu/add-menu.component'


@Component({
	selector: 'menu',
	templateUrl: 'menu.component.html'
})

export class MenuComponent implements OnInit {

	menus : Menu[]
	
	constructor(private modalService: NgbModal) { }

	ngOnInit() { }

	openAddMenu() {
		const modalRef = this.modalService.open(AddMenuComponent);
	  }
}