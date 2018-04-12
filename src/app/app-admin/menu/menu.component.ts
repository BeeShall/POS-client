import { Component, OnInit } from '@angular/core';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {Menu} from '../../dataModels/menu'
import {AddMenuComponent} from './add-menu/add-menu.component'
import {MenuService} from '../../services/menu.service'

/*

MenuComponent

DESCRIPTION: This is a component class for the menu page in the admin section

AUTHOR: BISHAL REGMI

DATE: 2/28/2018

*/


@Component({
	selector: 'menu',
	templateUrl: 'menu.component.html'
})

export class MenuComponent implements OnInit {

	//array to store all the menus
	menus : Menu[]

	//string to hold the search text typed
	public searchString: string;
	
	constructor(private modalService: NgbModal,
	private menuService: MenuService) {

		//fecthcing all the menus in the database
		this.menuService.getAllMenu()
			.subscribe(data=>{
				this.menus = data["menus"]
				console.log(this.menus)
			})
	 }

	ngOnInit() {
	 }

	 //this method is used to display the add-menu modal when add button is clicked
	openAddMenu() {
		const modalRef = this.modalService.open(AddMenuComponent,{ size: "lg"});
		modalRef.componentInstance.menus = this.menus;
		//parameter to the modal to indicate that add mode is on
		modalRef.componentInstance.newAdd = true;
	  }

	  //this method is used to view the details of all give menu
	  viewDetails(menu){
		const modalRef = this.modalService.open(AddMenuComponent,{ size: "lg"});
		modalRef.componentInstance.menu = menu;
		//parameter to the modal to indicate that add mode is on
		modalRef.componentInstance.newAdd = false;
	  }

	  //this method is used to delete a menu when the delete button is clicke
	  //PARAMETERS:
		  //menuId : id of the menu to be delete
		  //index: index of the menu in the array to delete locally as well
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