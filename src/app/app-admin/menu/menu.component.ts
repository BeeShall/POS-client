import { Component, OnInit } from '@angular/core';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {Menu} from '../../dataModels/menu'
import {AddMenuComponent} from './add-menu/add-menu.component'
import {MenuService} from '../../services/menu.service'


@Component({
	selector: 'menu',
	templateUrl: 'menu.component.html'
})

export class MenuComponent implements OnInit {

	menus : Menu[]
	
	constructor(private modalService: NgbModal,
	private menuService: MenuService) {
		this.menuService.getAllMenu()
			.subscribe(data=>{
				this.menus = data["menus"]
			})
	 }

	ngOnInit() {
	 }

	openAddMenu() {
		const modalRef = this.modalService.open(AddMenuComponent,{ size: "lg"});
		modalRef.componentInstance.menus = this.menus;
		modalRef.componentInstance.newAdd = true;
	  }

	  viewDetails(menu){
		const modalRef = this.modalService.open(AddMenuComponent,{ size: "lg"});
		modalRef.componentInstance.menu = menu;
		modalRef.componentInstance.newAdd = false;
	  }

	  delete(menuId, index){
		  this.menuService.deleteMenu(menuId).subscribe(data=>{
			  if(data["success"]){
				  console.log("Menu successfully deleted")
				  this.menus.splice(index, 1);
			  }
			  else{
				  console.log("Unable to delete the menu")
			  }
		  })
	  }
}