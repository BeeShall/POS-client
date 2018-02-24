import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Menu, MenuType, SizeList } from '../../../dataModels/menu';
import { MenuService } from '../../../services/menu.service'
import { NgForm } from '@angular/forms';
import { Nutrition } from '../../../dataModels/nutrition';

@Component({
	selector: 'add-menu',
	templateUrl: 'add-menu.component.html',
	styleUrls: ['add-menu.component.css']
})

export class AddMenuComponent implements OnInit {

	menuTypes = MenuType;
	sizeList = SizeList;

	@Input()
	menus: Menu[];

	@Input()
	newAdd: boolean;

	@Input()
	menu: Menu;

	constructor(public activeModal: NgbActiveModal,
		private menuService: MenuService) { }

	ngOnInit() {
		if (this.newAdd) {
			this.menu = new Menu();
		}
	}

	submit() {
		console.log(this.menu);
		if (this.newAdd) {
			this.menuService.addMenu(this.menu)
				.subscribe(data => {
					if (data["success"]) {
						console.log("Menu added");
						this.menu.menuId = data["id"];
						this.menus.push(this.menu);

						this.activeModal.close('Close click');
					}
					else {
						console.log("Error adding menu!")
					}
				})
		}
		else {
			this.menuService.updateMenu(this.menu)
				.subscribe(data => {
					if (data["success"]) {
						console.log("Menu updated");

						this.activeModal.close('Close click');
					}
					else {
						console.log("Error updating menu!")
					}
				})
		}
	}
}