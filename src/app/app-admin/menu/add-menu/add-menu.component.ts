import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {Menu, MenuType} from '../../../dataModels/menu';
import { MenuService } from '../../../services/menu.service'
import { NgForm } from '@angular/forms';

@Component({
	selector: 'add-menu',
	templateUrl: 'add-menu.component.html'
})

export class AddMenuComponent implements OnInit {

	ingredients = [];
	menuTypes = Object.keys(MenuType).filter(x=> x.length > 2)

	constructor(public activeModal: NgbActiveModal,
	private menuService: MenuService) { }

	ngOnInit() { }

	submit(addMenuForm:NgForm){
		console.log("Added")
		console.log(addMenuForm.value);
		delete addMenuForm.value["ingredient"];
		let menu: Menu = addMenuForm.value;
		menu.ingredients=this.ingredients;

		console.log(menu)
		this.menuService.addMenu(addMenuForm.value)
		.subscribe(data=> {
			if(data["success"]){
				console.log("Menu added")
			}
			else{
				console.log("Error adding menu!")
			}
		})
		this.activeModal.close('Close click');
	}
}